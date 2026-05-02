"use client";
import React, { useState, useEffect, useReducer } from "react";
import { api, Listing } from "@/lib/api";
import { debounce } from "@/lib/utils";

type State = {
  listings: Listing[];
  search: string;
  typeFilter: string;
  isModalOpen: boolean;
};

type Action = 
  | { type: 'SET_LISTINGS', payload: Listing[] }
  | { type: 'SET_SEARCH', payload: string }
  | { type: 'SET_FILTER', payload: string }
  | { type: 'TOGGLE_MODAL', payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LISTINGS': return { ...state, listings: action.payload };
    case 'SET_SEARCH': return { ...state, search: action.payload };
    case 'SET_FILTER': return { ...state, typeFilter: action.payload };
    case 'TOGGLE_MODAL': return { ...state, isModalOpen: action.payload };
    default: return state;
  }
}

export default function ManageDataPage() {
  const [state, dispatch] = useReducer(reducer, {
    listings: [],
    search: "",
    typeFilter: "All",
    isModalOpen: false,
  });

  const fetchListings = async () => {
    try {
      const data = await api.listings.getAll();
      dispatch({ type: 'SET_LISTINGS', payload: data });
    } catch (e) {
      console.error("Failed to fetch listings", e);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.listings.updateStatus(id, status);
      fetchListings(); // Refresh data
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.listings.delete(id);
      fetchListings();
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const filtered = state.listings.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(state.search.toLowerCase());
    const matchType = state.typeFilter === "All" || l.category === state.typeFilter;
    return matchSearch && matchType;
  });

  const handleSearch = debounce((val: string) => {
    dispatch({ type: 'SET_SEARCH', payload: val });
  }, 300);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", padding: "40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase" }}>
            ADMIN / DATABASE
          </span>
          <h1 style={{ fontFamily: "var(--font-plex)", fontWeight: 800, fontSize: "2.5rem", color: "var(--text)", letterSpacing: "-0.04em", marginTop: "0.5rem" }}>
            Manage Data
          </h1>
        </div>
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_MODAL', payload: true })}
          style={{
            background: 'var(--text)', color: 'var(--bg)', border: 'none',
            borderRadius: '100px', padding: '0.65rem 1.4rem', 
            fontFamily: 'var(--font-plex)', fontWeight: 700, fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          + Add Entry
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div style={{ position: "relative", width: "320px" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search listings..."
            style={{
              background: 'var(--surface2)', border: '1px solid var(--border)', 
              borderRadius: '12px', padding: '0.65rem 1rem 0.65rem 2.75rem', 
              color: 'var(--text)', fontFamily: 'var(--font-plex)', width: '100%',
              outline: "none"
            }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <select 
          style={{
            background: 'var(--surface2)', border: '1px solid var(--border)', 
            borderRadius: '12px', padding: '0.65rem 1rem', 
            color: 'var(--text)', fontFamily: 'var(--font-plex)', width: '180px',
            outline: "none"
          }}
          onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
        >
          <option>All</option>
          <option>Tech</option>
          <option>Auto</option>
          <option>Pharma</option>
          <option>Maritime</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--void)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden' }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {["Name", "City", "Category", "Status", "Contributor", "Actions"].map(h => (
                <th key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '1rem 1.5rem', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-plex)', fontWeight: 600, color: 'var(--text)' }}>{row.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-dim)' }}>{row.city?.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-dim)' }}>{row.category}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    borderRadius: '8px', padding: '3px 10px', fontFamily: 'JetBrains Mono, monospace', 
                    fontSize: '10px', letterSpacing: '0.08em', textTransform: "uppercase",
                    background: row.status === 'APPROVED' ? 'rgba(76,175,80,0.1)' : row.status === 'PENDING' ? 'rgba(128,126,131,0.1)' : 'rgba(232,118,118,0.1)',
                    color: row.status === 'APPROVED' ? '#4CAF50' : row.status === 'PENDING' ? '#807e83' : '#e87676',
                    border: `1px solid ${row.status === 'APPROVED' ? 'rgba(76,175,80,0.2)' : 'rgba(128,126,131,0.2)'}`
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '12px', color: 'var(--text-muted)' }}>{row.user?.name}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {row.status === 'PENDING' && (
                      <>
                        <button onClick={() => handleUpdateStatus(row.id, 'APPROVED')} style={{ color: '#4CAF50', background: 'transparent', border: '1px solid rgba(76,175,80,0.2)', borderRadius: '8px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}>Approve</button>
                        <button onClick={() => handleUpdateStatus(row.id, 'REJECTED')} style={{ color: '#e87676', border: '1px solid rgba(232,118,118,0.2)', background: 'transparent', borderRadius: '8px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}>Reject</button>
                      </>
                    )}
                    <button onClick={() => handleDelete(row.id)} style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', background: 'transparent', borderRadius: '8px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
