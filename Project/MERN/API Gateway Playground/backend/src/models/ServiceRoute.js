import mongoose from 'mongoose';

const serviceRouteSchema = new mongoose.Schema(
  {
    // Routes are shared across the whole playground (like a real gateway's
    // route table) - "createdBy" is only kept for display/audit purposes.
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    // Requests to /gateway/<pathPrefix>/... are matched against this. The
    // longest matching prefix wins, simulating how a real gateway routes to
    // the right upstream microservice.
    pathPrefix: { type: String, required: true, trim: true },
    method: { type: String, enum: ['ANY', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'], default: 'ANY' },
    targetType: { type: String, enum: ['mock', 'proxy'], default: 'mock' },
    targetUrl: { type: String, default: '' }, // used when targetType === 'proxy'
    mockResponse: {
      status: { type: Number, default: 200 },
      body: { type: mongoose.Schema.Types.Mixed, default: { message: 'ok' } },
    },
    latencyMs: { type: Number, default: 0, min: 0, max: 15000 },
    policy: {
      requireJwt: { type: Boolean, default: false },
      requireApiKey: { type: Boolean, default: false },
      rateLimit: {
        enabled: { type: Boolean, default: false },
        windowMs: { type: Number, default: 60000 },
        max: { type: Number, default: 20 },
      },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceRouteSchema.index({ pathPrefix: 1, method: 1 }, { unique: true });

export default mongoose.model('ServiceRoute', serviceRouteSchema);
