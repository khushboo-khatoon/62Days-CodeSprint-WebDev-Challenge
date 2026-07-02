import { BaseRepository } from './base.repository';
import { ISession, sessionModel } from '../models/session.model';

class SessionRepository extends BaseRepository<ISession> {
  constructor() {
    super(sessionModel);
  }

  async findBySessionId(sessionId: string): Promise<ISession | null> {
    return this.findById(sessionId);
  }

  async updateToken(sessionId: string, hashedToken: string): Promise<ISession | null> {
    return this.findOneAndUpdate({ _id: sessionId }, { token: hashedToken });
  }

  async deleteBySessionId(sessionId: string): Promise<any> {
    return this.deleteOne({ _id: sessionId });
  }

  async deleteManyByUserId(userId: string): Promise<any> {
    return this.deleteMany({ userId });
  }

  async createSession(userId: string, token: string): Promise<ISession> {
    return this.create({ userId, token });
  }
}

export const sessionRepository = new SessionRepository();