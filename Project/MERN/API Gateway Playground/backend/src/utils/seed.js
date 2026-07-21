// Creates a demo admin account plus a handful of example service routes and
// an API key, so the Playground/Console have something to explore right
// after `npm run dev`. Run with: npm run seed
import 'dotenv/config';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import ServiceRoute from '../models/ServiceRoute.js';
import ApiKey from '../models/ApiKey.js';

async function run() {
  await connectDB();

  const email = 'admin@gateway.local';
  let admin = await User.findOne({ email });
  if (!admin) {
    admin = await User.create({
      name: 'Gateway Admin',
      email,
      passwordHash: await User.hashPassword('admin1234'),
      role: 'admin',
    });
    console.log('Created demo admin: admin@gateway.local / admin1234');
  } else {
    console.log('Demo admin already exists');
  }

  const routeDefs = [
    {
      name: 'Public status service',
      pathPrefix: '/status',
      method: 'ANY',
      targetType: 'mock',
      mockResponse: { status: 200, body: { service: 'status', status: 'operational' } },
      latencyMs: 50,
      policy: { requireJwt: false, requireApiKey: false, rateLimit: { enabled: false } },
    },
    {
      name: 'Users microservice (API key required)',
      pathPrefix: '/users',
      method: 'ANY',
      targetType: 'mock',
      mockResponse: { status: 200, body: { users: [{ id: 1, name: 'Ada Lovelace' }, { id: 2, name: 'Alan Turing' }] } },
      latencyMs: 150,
      policy: { requireJwt: false, requireApiKey: true, rateLimit: { enabled: true, windowMs: 60000, max: 10 } },
    },
    {
      name: 'Billing microservice (JWT required, slow + rate limited)',
      pathPrefix: '/billing',
      method: 'ANY',
      targetType: 'mock',
      mockResponse: { status: 200, body: { invoices: [], message: 'no outstanding invoices' } },
      latencyMs: 400,
      policy: { requireJwt: true, requireApiKey: false, rateLimit: { enabled: true, windowMs: 30000, max: 5 } },
    },
    {
      name: 'Flaky inventory service (simulates outage)',
      pathPrefix: '/inventory',
      method: 'ANY',
      targetType: 'mock',
      mockResponse: { status: 503, body: { message: 'inventory service temporarily unavailable' } },
      latencyMs: 800,
      policy: { requireJwt: false, requireApiKey: false, rateLimit: { enabled: false } },
    },
  ];

  for (const def of routeDefs) {
    await ServiceRoute.findOneAndUpdate(
      { pathPrefix: def.pathPrefix, method: def.method },
      { createdBy: admin._id, ...def },
      { upsert: true, new: true }
    );
  }

  const existingKey = await ApiKey.findOne({ owner: admin._id, label: 'Demo key' });
  if (!existingKey) {
    const key = await ApiKey.create({ owner: admin._id, label: 'Demo key' });
    console.log('Created demo API key:', key.key);
  } else {
    console.log('Demo API key already exists:', existingKey.key);
  }

  console.log('Seed complete.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
