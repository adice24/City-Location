const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  constructor(public code: number, message: string, public details?: any) {
    super(message)
    this.name = 'ApiError'
  }
}

export interface City { 
  id: string; 
  name: string; 
  slug: string; 
  count: number; 
  description?: string;
  tag?: string; 
  gradient?: string; 
  accent?: string 
}

export interface Listing { 
  id: string; 
  name: string; 
  category: string; 
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; 
  cityId: string;
  city?: City;
  userId: string;
  user?: { name: string; email: string };
  data?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface KPI { label: string; value: string; trend: string; up: boolean }
export interface AnalyticsPoint { date: string; calls: number }
export interface College { id: string; name: string; students: string; rank: string; established: number }

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = new Headers(options.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  
  const body = await response.json().catch(() => ({ message: 'Unknown error' }));
  
  if (!response.ok) {
    throw new ApiError(response.status, body.message, body.errors);
  }

  return body;
}

export const api = {
  auth: {
    login: (credentials: Record<string, unknown>) => request<unknown>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    signup: (data: Record<string, unknown>) => request<unknown>('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  },
  cities: {
    getAll: () => request<City[]>('/cities'),
    getOne: (id: string) => request<City>(`/cities/${id}`),
  },
  listings: {
    getAll: (params?: Record<string, string>) => {
      const query = params ? `?${new URLSearchParams(params)}` : '';
      return request<Listing[]>(`/listings${query}`);
    },
    create: (data: Record<string, unknown>) => request<Listing>('/listings', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) => request<Listing>(`/listings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    delete: (id: string) => request<unknown>(`/listings/${id}`, { method: 'DELETE' }),
  }
};

// COMPATIBILITY LAYER FOR EXISTING COMPONENTS
export async function getCities(): Promise<City[]> {
  try {
    const cities = await api.cities.getAll();
    return cities.map(c => ({
      ...c,
      count: (c as { _count?: { listings: number } })._count?.listings || 0,
      tag: c.slug === 'bangalore' ? 'Tech Hub' : c.slug === 'chennai' ? 'Industrial' : c.slug === 'hyderabad' ? 'Pharma' : 'Port City',
      gradient: getCityGradient(c.slug),
      accent: getCityAccent(c.slug)
    }));
  } catch (_e) {
    return []; // Fallback to empty
  }
}

function getCityGradient(slug: string) {
  if (slug === 'bangalore') return 'linear-gradient(135deg, #1a1a1a 0%, #1f1028 40%, #2d1a4e 70%, #b287fd 100%)';
  if (slug === 'chennai') return 'linear-gradient(135deg, #1a1a1a 0%, #1a280a 40%, #2d4414 70%, #b2f142 100%)';
  if (slug === 'hyderabad') return 'linear-gradient(135deg, #1a1a1a 0%, #20181a 40%, #3d2028 70%, #c87090 100%)';
  return 'linear-gradient(135deg, #1a1a1a 0%, #0d1a1f 40%, #103040 70%, #4ab0d4 100%)';
}

function getCityAccent(slug: string) {
  if (slug === 'bangalore') return '#b287fd';
  if (slug === 'chennai') return '#b2f142';
  if (slug === 'hyderabad') return '#c87090';
  return '#4ab0d4';
}

export async function getCityDetails(id: string): Promise<City | undefined> {
  const cities = await getCities();
  return cities.find(c => c.slug === id || c.id === id);
}

export async function getCityColleges(_cityId: string): Promise<College[]> {
  // Mapping to listings in the future, currently returning mock
  return [
    { id: 'C-001', name: 'Indian Institute of Science', students: '4,500', rank: '1', established: 1909 },
    { id: 'C-002', name: 'IIT Madras', students: '9,800', rank: '2', established: 1959 },
  ];
}

export async function getListings(): Promise<Listing[]> {
  try {
    return await api.listings.getAll();
  } catch (_e) {
    return [];
  }
}

export async function getKPIs(): Promise<KPI[]> {
  return [
    { label: 'Total Listings',  value: '3.2M',  trend: '+8.2%', up: true  },
    { label: 'Active Cities',   value: '4',     trend: '+1',    up: true  },
    { label: 'API Calls Today', value: '184K',  trend: '+12.4%',up: true  },
    { label: 'Avg Response',    value: '42ms',  trend: '-3ms',  up: true  },
  ];
}

export async function getAnalytics(days: number = 30): Promise<AnalyticsPoint[]> {
  return Array.from({ length: days }, (_, i) => ({
    date: `2024-04-${i + 1}`,
    calls: Math.floor(Math.random() * 50000) + 100000
  }));
}
