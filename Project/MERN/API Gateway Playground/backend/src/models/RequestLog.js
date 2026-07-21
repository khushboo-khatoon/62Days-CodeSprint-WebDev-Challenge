import mongoose from 'mongoose';

const requestLogSchema = new mongoose.Schema(
  {
    // Gateway traffic isn't necessarily authenticated (a route might have no
    // policy at all), so logs are a shared table rather than per-user data.
    method: { type: String, required: true },
    path: { type: String, required: true },
    matchedRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceRoute', default: null },
    routeName: { type: String, default: null },
    statusCode: { type: Number, required: true },
    latencyMs: { type: Number, required: true },
    // What the policy layer decided before the request was (or wasn't) handled.
    policyOutcome: {
      type: String,
      enum: ['allowed', 'unauthorized', 'forbidden_api_key', 'rate_limited', 'not_found', 'upstream_error'],
      required: true,
    },
    apiKeyUsed: { type: String, default: null },
    userSubject: { type: String, default: null },
    ip: { type: String, default: '' },
    error: { type: String, default: null },
  },
  { timestamps: true }
);

requestLogSchema.index({ createdAt: -1 });

export default mongoose.model('RequestLog', requestLogSchema);
