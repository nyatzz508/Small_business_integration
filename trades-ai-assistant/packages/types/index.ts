export type Business = {
  id: string
  name: string
  ownerUserId: string
  timezone: string
  phoneNumber?: string
  serviceZips?: string[]
  createdAt?: string
}

export type CallRecord = {
  id: string
  businessId: string
  direction?: 'inbound' | 'outbound'
  fromNumber?: string
  toNumber?: string
  startedAt?: string
  endedAt?: string
  transcription?: string
  metadata?: Record<string, any>
  createdAt?: string
}

export type Lead = {
  id: string
  businessId: string
  callId?: string
  name?: string
  phone?: string
  serviceType?: string
  details?: string
  status?: 'new' | 'contacted' | 'closed'
  createdAt?: string
}

export type Appointment = {
  id: string
  businessId: string
  leadId?: string
  scheduledFor?: string
  status?: 'scheduled' | 'completed' | 'cancelled'
  createdAt?: string
}
