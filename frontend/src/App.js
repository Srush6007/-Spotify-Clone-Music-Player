import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';

// Components
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  BookOpenIcon,
  HeartIcon,
  PlusIcon,
  ArrowDownIcon,
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Add axios for API calls
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Main App Component
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };
  
  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create more comprehensive mock data
        const mockPlaylists = [
          { id: 1, name: "Liked Songs", description: "Your liked songs", count: 234, image: "https://images.unsplash.com/photo-1554425604-b02b2f5e7f1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 2, name: "Chill Vibes", description: "Perfect for relaxation", count: 89, image: "https://images.unsplash.com/photo-1510759704643-849552bf3b66?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 3, name: "Hip Hop Hits", description: "Latest hip hop tracks", count: 156, image: "https://images.unsplash.com/photo-1510759782946-09866453296a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          // Replaced Electronic Dance album with Pop Party album
          { id: 4, name: "Pop Party", description: "Best pop songs for partying", count: 187, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 5, name: "Classic Rock", description: "Rock legends", count: 178, image: "https://images.unsplash.com/photo-1522000719313-5ded740290b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHx2aW55bCUyMHJlY29yZHN8ZW58MHx8fGJsdWV8MTc1MzAxOTk1NHww&ixlib=rb-4.1.0&q=85" },
          // Additional albums
          { id: 6, name: "Pop Hits", description: "Today's top pop songs", count: 120, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 7, name: "Workout Mix", description: "High energy tracks for your workout", count: 95, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 8, name: "Jazz Classics", description: "Timeless jazz standards", count: 142, image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw4fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 9, name: "Country Roads", description: "Country favorites and new releases", count: 110, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw5fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 10, name: "Indie Mix", description: "Independent artists you should know", count: 87, image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" }
        ];
        
        const mockSongs = [
          { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", image: "https://images.unsplash.com/photo-1554425604-b02b2f5e7f1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 2, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", image: "https://images.unsplash.com/photo-1510759704643-849552bf3b66?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 3, title: "Industry Baby", artist: "Lil Nas X ft. Jack Harlow", album: "MONTERO", duration: "3:32", image: "https://images.unsplash.com/photo-1510759782946-09866453296a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          // Replaced song with different image
          { id: 4, title: "As It Was", artist: "Harry Styles", album: "Harry's House", duration: "2:47", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 5, title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:58", image: "https://images.unsplash.com/photo-1522000719313-5ded740290b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHx2aW55bCUyMHJlY29yZHN8ZW58MHx8fGJsdWV8MTc1MzAxOTk1NHww&ixlib=rb-4.1.0&q=85" },
          // Additional songs
          { id: 6, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 7, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 8, title: "Montero", artist: "Lil Nas X", album: "Montero", duration: "2:17", image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw4fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 9, title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: "3:18", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw5fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 10, title: "Kiss Me More", artist: "Doja Cat ft. SZA", album: "Planet Her", duration: "3:28", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" }
        ];
        
        setPlaylists(mockPlaylists);
        setSongs(mockSongs);
        
        // Send a status check to backend
        await axios.post(`${API_BASE_URL}/status`, {
          client_name: "Spotify Clone Frontend"
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use mock data if API fails
        const mockPlaylists = [
          { id: 1, name: "Liked Songs", description: "Your liked songs", count: 234, image: "https://images.unsplash.com/photo-1554425604-b02b2f5e7f1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 2, name: "Chill Vibes", description: "Perfect for relaxation", count: 89, image: "https://images.unsplash.com/photo-1510759704643-849552bf3b66?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 3, name: "Hip Hop Hits", description: "Latest hip hop tracks", count: 156, image: "https://images.unsplash.com/photo-1510759782946-09866453296a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          // Replaced Electronic Dance album with Pop Party album
          { id: 4, name: "Pop Party", description: "Best pop songs for partying", count: 187, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 5, name: "Classic Rock", description: "Rock legends", count: 178, image: "https://images.unsplash.com/photo-1522000719313-5ded740290b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHx2aW55bCUyMHJlY29yZHN8ZW58MHx8fGJsdWV8MTc1MzAxOTk1NHww&ixlib=rb-4.1.0&q=85" },
          // Additional albums
          { id: 6, name: "Pop Hits", description: "Today's top pop songs", count: 120, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 7, name: "Workout Mix", description: "High energy tracks for your workout", count: 95, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 8, name: "Jazz Classics", description: "Timeless jazz standards", count: 142, image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw4fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 9, name: "Country Roads", description: "Country favorites and new releases", count: 110, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw5fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 10, name: "Indie Mix", description: "Independent artists you should know", count: 87, image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" }
        ];

        const mockSongs = [
          { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", image: "https://images.unsplash.com/photo-1554425604-b02b2f5e7f1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 2, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", image: "https://images.unsplash.com/photo-1510759704643-849552bf3b66?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 3, title: "Industry Baby", artist: "Lil Nas X ft. Jack Harlow", album: "MONTERO", duration: "3:32", image: "https://images.unsplash.com/photo-1510759782946-09866453296a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          // Replaced song with different image
          { id: 4, title: "As It Was", artist: "Harry Styles", album: "Harry's House", duration: "2:47", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 5, title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:58", image: "https://images.unsplash.com/photo-1522000719313-5ded740290b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHx2aW55bCUyMHJlY29yZHN8ZW58MHx8fGJsdWV8MTc1MzAxOTk1NHww&ixlib=rb-4.1.0&q=85" },
          // Additional songs
          { id: 6, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 7, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 8, title: "Montero", artist: "Lil Nas X", album: "Montero", duration: "2:17", image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw4fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 9, title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: "3:18", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw5fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
          { id: 10, title: "Kiss Me More", artist: "Doja Cat ft. SZA", album: "Planet Her", duration: "3:28", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" }
        ];
        
        setPlaylists(mockPlaylists);
        setSongs(mockSongs);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading Spotify Clone...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar playlists={playlists} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<HomePage songs={songs} playlists={playlists} onSongSelect={handleSongSelect} />} />
              <Route path="/search" element={<SearchPage songs={songs} onSongSelect={handleSongSelect} />} />
              <Route path="/library" element={<LibraryPage playlists={playlists} />} />
              <Route path="/playlist/:id" element={<PlaylistPage playlists={playlists} songs={songs} onSongSelect={handleSongSelect} />} />
            </Routes>
          </div>
        </div>
        <Player 
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          onPlayPause={handlePlayPause} 
        />
      </div>
    </BrowserRouter>
  );
}

// Sidebar Component
function Sidebar({ playlists }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* Logo - Updated to match original Spotify logo */}
      <div className="sidebar-logo-container">
        <div className="text-logo">
          <div className="text-logo-icon">
            ♪
          </div>
          Spotify
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate('/')}
              className={`flex items-center text-white hover:text-white text-sm font-semibold w-full text-left ${
                location.pathname === '/' ? 'text-white' : 'text-gray-300'
              }`}
            >
              <HomeIcon className="w-6 h-6 mr-4" />
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/search')}
              className={`flex items-center text-white hover:text-white text-sm font-semibold w-full text-left ${
                location.pathname === '/search' ? 'text-white' : 'text-gray-300'
              }`}
            >
              <MagnifyingGlassIcon className="w-6 h-6 mr-4" />
              Search
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/library')}
              className={`flex items-center text-white hover:text-white text-sm font-semibold w-full text-left ${
                location.pathname === '/library' ? 'text-white' : 'text-gray-300'
              }`}
            >
              <BookOpenIcon className="w-6 h-6 mr-4" />
              Your Library
            </button>
          </li>
        </ul>

        {/* Create Playlist */}
        <div className="mt-8">
          <button className="flex items-center text-gray-300 hover:text-white text-sm font-semibold">
            <PlusIcon className="w-6 h-6 mr-4" />
            Create Playlist
          </button>
          <button className="flex items-center text-gray-300 hover:text-white text-sm font-semibold mt-4">
            <HeartIcon className="w-6 h-6 mr-4" />
            Liked Songs
          </button>
        </div>

        {/* Playlists */}
        <div className="mt-8">
          <hr className="border-gray-800 mb-4" />
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => navigate(`/playlist/${playlist.id}`)}
                className="block text-gray-300 hover:text-white text-sm text-left"
              >
                {playlist.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Install App */}
      <div className="p-6 border-t border-gray-800">
        <button className="flex items-center text-gray-300 hover:text-white text-sm font-semibold">
          <ArrowDownIcon className="w-6 h-6 mr-4" />
          Install App
        </button>
      </div>
    </div>
  );
}

// Top Bar Component
function TopBar({ canGoBack, canGoForward, onBack, onForward }) {
  const navigate = useNavigate();

  return (
    <div className="bg-black bg-opacity-90 backdrop-blur-md sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`p-2 rounded-full ${
            canGoBack ? 'bg-black bg-opacity-70 text-white hover:bg-opacity-90' : 'bg-black bg-opacity-30 text-gray-500'
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={`p-2 rounded-full ${
            canGoForward ? 'bg-black bg-opacity-70 text-white hover:bg-opacity-90' : 'bg-black bg-opacity-30 text-gray-500'
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Upgrade
        </button>
        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}

// Player Component
function Player({ currentSong, isPlaying, onPlayPause }) {
  return (
    <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
      {/* Song Info */}
      <div className="flex items-center space-x-4 flex-1">
        {currentSong ? (
          <>
            <img 
              src={currentSong.image} 
              alt={currentSong.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div>
              <div className="text-white text-sm font-medium">{currentSong.title}</div>
              <div className="text-gray-400 text-xs">{currentSong.artist}</div>
            </div>
            <HeartIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-800 rounded"></div>
            <div>
              <div className="text-gray-400 text-sm">No song selected</div>
            </div>
          </div>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center space-x-6 mb-2">
          <ArrowsRightLeftIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          <BackwardIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <button
            onClick={onPlayPause}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5 ml-0.5" />
            )}
          </button>
          <ForwardIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <ArrowPathIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-lg">
          <span className="text-xs text-gray-400">1:23</span>
          <div className="bg-gray-600 rounded-full h-1 flex-1">
            <div className="bg-white rounded-full h-1 w-1/3"></div>
          </div>
          <span className="text-xs text-gray-400">3:20</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center space-x-2 flex-1 justify-end">
        <SpeakerWaveIcon className="w-5 h-5 text-gray-400" />
        <div className="bg-gray-600 rounded-full h-1 w-24">
          <div className="bg-white rounded-full h-1 w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

// Home Page Component
function HomePage({ songs, playlists, onSongSelect }) {
  const recentlyPlayed = songs.slice(0, 6);
  
  // Additional albums for the "Made for You" section
  const additionalAlbums = [
    { id: 6, name: "Pop Hits", description: "Today's top pop songs", count: 120, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 7, name: "Workout Mix", description: "High energy tracks for your workout", count: 95, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 8, name: "Jazz Classics", description: "Timeless jazz standards", count: 142, image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw4fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 9, name: "Country Roads", description: "Country favorites and new releases", count: 110, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw5fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 10, name: "Indie Mix", description: "Independent artists you should know", count: 87, image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" }
  ];
  
  // Additional songs
  const additionalSongs = [
    { id: 6, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw2fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 7, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw3fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 8, title: "Montero", artist: "Lil Nas X", album: "Montero", duration: "2:17", image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw4fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 9, title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: "3:18", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw5fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" },
    { id: 10, title: "Kiss Me More", artist: "Doja Cat ft. SZA", album: "Planet Her", duration: "3:28", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMG11c2ljfGVufDB8fHxibHVlfDE3NTMwMTk5NDR8MA&ixlib=rb-4.1.0&q=85" }
  ];
  
  // Combine all playlists and songs
  const allPlaylists = [...playlists, ...additionalAlbums];
  const allSongs = [...songs, ...additionalSongs];

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen main-content">
      <div className="pt-8 px-8">
        <h1 className="text-white text-3xl font-bold mb-8">Good evening</h1>

        {/* Recently Played */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {allSongs.slice(0, 6).map((song) => (
            <div 
              key={song.id}
              className="bg-gray-800 bg-opacity-50 rounded-lg flex items-center hover:bg-opacity-70 transition-all cursor-pointer group"
              onClick={() => onSongSelect(song)}
            >
              <img 
                src={song.image} 
                alt={song.title}
                className="w-20 h-20 rounded-l-lg object-cover"
              />
              <div className="p-4 flex-1">
                <div className="text-white font-semibold">{song.title}</div>
              </div>
              <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-green-500 text-black rounded-full p-3 hover:scale-105 transition-transform">
                  <PlayIcon className="w-6 h-6 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Made for You - Improved Grid Layout with Uniform Sizes */}
        <section className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-6">Made for you</h2>
          <div className="album-grid">
            {allPlaylists.map((playlist) => (
              <div 
                key={playlist.id}
                className="album-grid-item group cursor-pointer"
                onClick={() => window.location.hash = `#/playlist/${playlist.id}`}
              >
                <div className="album-cover-container">
                  <img 
                    src={playlist.image} 
                    alt={playlist.name}
                    className="album-cover"
                  />
                  <button className="album-play-button">
                    <PlayIcon className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
                <div className="album-title">{playlist.name}</div>
                <div className="album-description">{playlist.description}</div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Recently Played Songs with Uniform Sizes */}
        <section className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-6">Recently played</h2>
          <div className="recently-played-grid">
            {allSongs.map((song) => (
              <div 
                key={song.id}
                className="recently-played-item group cursor-pointer"
                onClick={() => onSongSelect(song)}
              >
                <div className="recently-played-cover-container">
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="recently-played-cover"
                  />
                  <button className="recently-played-play-button">
                    <PlayIcon className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
                <div className="recently-played-title">{song.title}</div>
                <div className="recently-played-artist">{song.artist}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Search Page Component
function SearchPage({ songs, onSongSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const genres = [
    { name: 'Pop', color: 'from-pink-500 to-violet-500', image: songs[0]?.image || '' },
    { name: 'Hip-Hop', color: 'from-orange-500 to-red-500', image: songs[1]?.image || '' },
    { name: 'Rock', color: 'from-red-500 to-pink-500', image: songs[2]?.image || '' },
    { name: 'Electronic', color: 'from-cyan-500 to-blue-500', image: songs[3]?.image || '' },
    { name: 'Indie', color: 'from-green-500 to-emerald-500', image: songs[4]?.image || '' },
    { name: 'Jazz', color: 'from-purple-500 to-indigo-500', image: songs[5]?.image || '' },
    { name: 'Country', color: 'from-yellow-500 to-orange-500', image: songs[6]?.image || '' },
    { name: 'Workout', color: 'from-red-500 to-pink-500', image: songs[7]?.image || '' }
  ];

  const filteredSongs = searchTerm 
    ? songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="bg-black min-h-screen main-content">
      <div className="pt-8 px-8">
        <h1 className="text-white text-3xl font-bold mb-8">Search</h1>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-96">
          <MagnifyingGlassIcon className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Search Results */}
        {searchTerm ? (
          <section className="mb-8">
            <h2 className="text-white text-2xl font-bold mb-6">Songs</h2>
            <div className="space-y-2">
              {filteredSongs.map((song, index) => (
                <div 
                  key={song.id}
                  className="flex items-center p-2 rounded hover:bg-gray-800 cursor-pointer group"
                  onClick={() => onSongSelect(song)}
                >
                  <div className="w-8 text-center text-gray-400 group-hover:hidden">
                    {index + 1}
                  </div>
                  <button className="w-8 text-center text-white hidden group-hover:block">
                    <PlayIcon className="w-5 h-5 mx-auto" />
                  </button>
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover mx-4"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{song.title}</div>
                    <div className="text-gray-400 text-sm">{song.artist}</div>
                  </div>
                  <div className="text-gray-400 text-sm mr-4">{song.duration}</div>
                  <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Browse All */
          <section>
            <h2 className="text-white text-2xl font-bold mb-6">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {genres.map((genre) => (
                <div 
                  key={genre.name}
                  className={`relative p-4 rounded-lg bg-gradient-to-br ${genre.color} cursor-pointer hover:scale-105 transition-transform overflow-hidden`}
                  style={{ height: '220px' }}
                >
                  <div className="text-white text-2xl font-bold mb-4">{genre.name}</div>
                  <img 
                    src={genre.image} 
                    alt={genre.name}
                    className="absolute bottom-0 right-0 w-20 h-20 object-cover rounded transform rotate-12 translate-x-2 translate-y-2"
                  />
                </div>
              ))}
            </div>
            
            {/* Recently Played Songs with Uniform Sizes */}
            <h2 className="text-white text-2xl font-bold mb-6 mt-12">Recently played</h2>
            <div className="recently-played-grid">
              {songs.slice(0, 10).map((song) => (
                <div 
                  key={song.id}
                  className="recently-played-item group cursor-pointer"
                  onClick={() => onSongSelect(song)}
                >
                  <div className="recently-played-cover-container">
                    <img 
                      src={song.image} 
                      alt={song.title}
                      className="recently-played-cover"
                    />
                    <button className="recently-played-play-button">
                      <PlayIcon className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <div className="recently-played-title">{song.title}</div>
                  <div className="recently-played-artist">{song.artist}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Library Page Component
function LibraryPage({ playlists }) {
  return (
    <div className="bg-black min-h-screen main-content">
      <div className="pt-8 px-8">
        <h1 className="text-white text-3xl font-bold mb-8">Your Library</h1>

        <div className="flex items-center space-x-4 mb-8">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700">
            Recently played
          </button>
          <button className="text-gray-400 px-4 py-2 rounded-full text-sm font-medium hover:text-white">
            Recently added
          </button>
          <button className="text-gray-400 px-4 py-2 rounded-full text-sm font-medium hover:text-white">
            Alphabetical
          </button>
        </div>

        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              className="flex items-center p-2 rounded hover:bg-gray-800 cursor-pointer group"
              onClick={() => window.location.hash = `#/playlist/${playlist.id}`}
            >
              <img 
                src={playlist.image} 
                alt={playlist.name}
                className="w-16 h-16 rounded object-cover mr-4"
              />
              <div className="flex-1">
                <div className="text-white font-medium">{playlist.name}</div>
                <div className="text-gray-400 text-sm">Playlist • {playlist.count} songs</div>
              </div>
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>
        
        {/* Recently Added Section */}
        <div className="mt-12">
          <h2 className="text-white text-2xl font-bold mb-6">Recently Added</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {playlists.slice(0, 5).map((playlist) => (
              <div 
                key={`recent-${playlist.id}`}
                className="bg-gray-900 bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all cursor-pointer group"
                style={{ height: '220px' }}
              >
                <div className="relative mb-4">
                  <img 
                    src={playlist.image} 
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 bg-green-500 text-black rounded-full p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                    <PlayIcon className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
                <div className="text-white font-semibold mb-1 truncate">{playlist.name}</div>
                <div className="text-gray-400 text-sm truncate">{playlist.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Playlist Page Component
function PlaylistPage({ playlists, songs, onSongSelect }) {
  const { id } = useParams();
  
  // Find the playlist
  const playlist = playlists.find(p => p.id === parseInt(id)) || playlists[0];
  
  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen">
      <div className="pt-8 px-8">
        <div className="flex items-end space-x-6 mb-8">
          <img 
            src={playlist.image} 
            alt={playlist.name}
            className="w-48 h-48 rounded shadow-lg"
          />
          <div>
            <div className="text-gray-400 text-sm uppercase font-semibold mb-4">Playlist</div>
            <h1 className="text-white text-5xl font-bold mb-6">{playlist.name}</h1>
            <p className="text-gray-400">{playlist.description}</p>
            <div className="flex items-center mt-4">
              <div className="text-white font-semibold">Spotify</div>
              <div className="text-gray-400 mx-2">•</div>
              <div className="text-gray-400">{playlist.count} songs</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mb-8">
          <button className="bg-green-500 text-black rounded-full p-4 hover:scale-105 transition-transform mr-6">
            <PlayIcon className="w-8 h-8 ml-0.5" />
          </button>
          <HeartIcon className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer mr-6" />
          <EllipsisHorizontalIcon className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />
        </div>
        
        <div className="space-y-2">
          {songs.map((song, index) => (
            <div 
              key={song.id}
              className="grid grid-cols-12 gap-4 items-center p-2 rounded hover:bg-gray-800 cursor-pointer group"
              onClick={() => onSongSelect(song)}
            >
              <div className="col-span-1 text-gray-400 group-hover:hidden">
                {index + 1}
              </div>
              <button className="col-span-1 text-white hidden group-hover:block">
                <PlayIcon className="w-5 h-5 mx-auto" />
              </button>
              <div className="col-span-5 flex items-center">
                <img 
                  src={song.image} 
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover mr-4"
                />
                <div>
                  <div className="text-white font-medium">{song.title}</div>
                  <div className="text-gray-400 text-sm">{song.artist}</div>
                </div>
              </div>
              <div className="col-span-4 text-gray-400 text-sm">{song.album}</div>
              <div className="col-span-1 text-gray-400 text-sm flex justify-end">{song.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;