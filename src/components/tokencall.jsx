import { useState } from 'react';

export default function TokenCall() {
  const [playerName, setPlayerName] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlayer = async () => {
    if (!playerName.trim()) return;
    
    setLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const res = await fetch(`/api/player?name=${encodeURIComponent(playerName)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch player data.');
      }

      setPlayerData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-card rounded-xl border shadow-sm my-8">
      <h2 className="text-xl font-bold mb-4">Trove Player Search</h2>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={playerName} 
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name..."
          className="flex-1 p-2 border rounded-md bg-background text-foreground"
          onKeyDown={(e) => e.key === 'Enter' && fetchPlayer()}
        />
        <button 
          onClick={fetchPlayer} 
          disabled={loading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm">
          {error}
        </div>
      )}

      {playerData && (
        <div className="mt-4 p-4 bg-muted/50 border rounded-md overflow-x-auto">
          <h3 className="text-sm font-semibold mb-2">Result (Response JSON):</h3>
          <pre className="text-xs text-muted-foreground font-mono">
            {JSON.stringify(playerData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}