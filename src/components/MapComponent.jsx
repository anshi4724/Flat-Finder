import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '2rem'
};

const MapComponent = ({ center, title }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(m) {
    setMap(m);
  }, []);

  const onUnmount = React.useCallback(function callback(m) {
    setMap(null);
  }, []);

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-[400px] bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10 border border-indigo-500/20 rounded-[2rem] flex flex-col items-center justify-center text-slate-500 gap-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-2 h-2 bg-indigo-500 rounded-full"></div>
          <div className="absolute top-12 right-8 w-1 h-1 bg-fuchsia-500 rounded-full"></div>
          <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-fuchsia-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-indigo-300 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-fuchsia-300 rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">🗺️</span>
          </div>
          <h3 className="text-slate-900 dark:text-white font-black text-lg mb-2">Interactive Map</h3>
          <p className="font-medium text-sm text-slate-600 dark:text-slate-400 mb-4">Explore the neighborhood</p>
        </div>
        
        {/* Location Info */}
        <div className="relative z-10 p-6 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <span className="text-indigo-400">📍</span>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Property Location</div>
              <div className="font-bold text-slate-900 dark:text-white">{title}</div>
            </div>
          </div>
          
          {/* Coordinates Display */}
          {center && (
            <div className="space-y-2">
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Lat:</span>
                  <span className="font-mono text-indigo-400">{center.lat?.toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Lng:</span>
                  <span className="font-mono text-fuchsia-400">{center.lng?.toFixed(4)}</span>
                </div>
              </div>
              
              {/* Location accuracy indicator */}
              <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-bold uppercase tracking-widest">Accurate Location</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <button 
          onClick={() => {
            if (center) {
              const url = `https://www.google.com/maps?q=${center.lat},${center.lng}`;
              window.open(url, '_blank');
            }
          }}
          className="relative z-10 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>🔗</span>
          Open in Google Maps
        </button>
      </div>
    );
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          // ... (Can add more dark mode styles)
        ]
      }}
    >
      <Marker position={center} title={title} />
    </GoogleMap>
  ) : <div className="animate-pulse bg-white/5 h-[400px] rounded-[2rem]"></div>;
};

export default React.memo(MapComponent);
