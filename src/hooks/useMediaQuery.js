import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create listener
    const listener = () => setMatches(media.matches);
    
    // Add listener
    if (media.addListener) {
      media.addListener(listener);
    } else {
      media.addEventListener('change', listener);
    }

    // Cleanup
    return () => {
      if (media.removeListener) {
        media.removeListener(listener);
      } else {
        media.removeEventListener('change', listener);
      }
    };
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;

