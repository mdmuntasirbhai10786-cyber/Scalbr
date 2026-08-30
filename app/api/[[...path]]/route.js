import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME // optional; falls back to db from URI
let cachedClient = null

async function getDb() {
  if (!uri) throw new Error('MONGO_URL is not set')
  if (cachedClient) return dbName ? cachedClient.db(dbName) : cachedClient.db()
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
  })
  await client.connect()
  cachedClient = client
  return dbName ? client.db(dbName) : client.db()
}

function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return res
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }))
}

async function handle(request, method) {
  try {
    const { pathname } = new URL(request.url)
    const path = pathname.replace(/^\/api\/?/, '')

    if (path === '' || path === 'health') {
      return cors(NextResponse.json({ ok: true, service: 'scalbr-api' }))
    }

    // POST /api/leads  -> create lead
    if (path === 'leads' && method === 'POST') {
      const body = await request.json()
      const required = ['fullName', 'email']
      for (const field of required) {
        if (!body[field] || String(body[field]).trim() === '') {
          return cors(NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 }))
        }
      }
      const attachments = Array.isArray(body.attachments)
        ? body.attachments
            .filter((a) => a && a.name && a.dataUrl)
            .slice(0, 10)
            .map((a) => ({
              name: String(a.name).slice(0, 200),
              type: String(a.type || 'application/octet-stream').slice(0, 100),
              size: Number(a.size) || 0,
              dataUrl: String(a.dataUrl),
            }))
        : []
      const lead = {
        id: uuidv4(),
        fullName: body.fullName || '',
        company: body.company || '',
        email: body.email || '',
        link: body.link || '',
        industry: body.industry || '',
        videoType: body.videoType || '',
        volume: body.volume || '',
        budget: body.budget || '',
        message: body.message || '',
        attachments,
        attachmentCount: attachments.length,
        createdAt: new Date().toISOString(),
      }
      const db = await getDb()
      await db.collection('leads').insertOne(lead)
      return cors(NextResponse.json({ success: true, id: lead.id, attachments: attachments.length }))
    }

    // GET /api/leads (admin peek) — exclude heavy attachments payload
    if (path === 'leads' && method === 'GET') {
      const db = await getDb()
      const leads = await db.collection('leads')
        .find({}, { projection: { _id: 0, attachments: 0 } })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray()
      return cors(NextResponse.json({ leads }))
    }

    return cors(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  } catch (err) {
    console.error('API error:', err)
    return cors(NextResponse.json({ error: 'Server error', detail: String(err?.message || err) }, { status: 500 }))
  }
}

export async function GET(request) { return handle(request, 'GET') }
export async function POST(request) { return handle(request, 'POST') }
export async function PUT(request) { return handle(request, 'PUT') }
export async function DELETE(request) { return handle(request, 'DELETE') }
