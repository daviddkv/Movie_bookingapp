import React, { useState } from 'react';

let SCREENS = [
  {
    id: 1,
    time: "10:30am",
    seats: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  },
  {
    id: 2,
    time: "2:30pm",
    seats: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  },
  {
    id: 3,
    time: "6:30pm",
    seats: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
];

const MOVIES = [
  {
    id: 1,
    title: "Oppenheimer",
    image: "https://www.dvdsreleasedates.com/posters/800/O/Oppenheimer-2023-movie-poster.jpg",
  },
  {
    id: 2,
    title: "Aneethi",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2c66c9159446921.639ee2b330546.jpg",
  },
  {
    id: 3,
    title: "Por Thozhil",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/por-thozhil-et00357691-1684415887.jpg",
  },
];

export const MovieBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

 
    const handleSeatSelect = (index, screen) => {
      if (screen?.id !== selectedScreen?.id) {
        setSelectedSeats([index]);
        setSelectedScreen(screen);
        return;
      }
    
      if (selectedSeats.includes(index)) {
        setSelectedSeats(selectedSeats.filter((i) => i !== index));
        if (selectedSeats.filter((i) => i !== index).length < 1) {
          setSelectedScreen(null);
        }
      } else {
        setSelectedSeats((seats) => [...seats, index]);
      }
    };
    
  const handleBooking = () => {
    alert(`Seats ${selectedSeats.map((index) => index + 1).join(",")} booked for ${selectedScreen?.movie.title} at ${selectedScreen?.time}`);
    SCREENS = SCREENS.map((screen) => {
      if (screen.id === selectedScreen.id) {
        let seats = [...screen.seats];
        selectedSeats.forEach((seat) => (seats[seat] = 0));
        return {
          ...screen,
          seats,
        };
      }
      return screen;
    });
    setSelectedMovie(null);
    setSelectedScreen(null);
    setSelectedSeats([]);
  };
  

  return (
    <div className='full-page'>
      <h1>Movie Booking App</h1>
      <h2>Choose Your Movie:</h2>
      <div className='movie-selection'>
        {MOVIES.map((movie) => (
          <div className='movie' key={movie.id} onClick={() => setSelectedMovie(movie)}>
            <img className='movie-poster' src={movie.image} alt={movie.title} />
            <div className='movie-title'>{movie.title}</div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <>
          <h2>Choose your screen</h2>
          <div className='screen-selection'>
            {SCREENS.map((screen) => {
              return (
                <div
                  key={screen.id}
                  className={`screen ${screen.id === selectedMovie.id ? 'selected' : ''} ${
                    screen.seats.includes(1) ? 'available' : ''
                  }`}
                >
                  <div className='screen-number'>Screen{screen.id}</div>
                  <div className='screen-time'>{screen.time}</div>
                  <div className='movie-title'>{selectedMovie.title}</div>
                  <div className='screen-seats'>
                    {screen.seats.map((seat, index) => {
                      return (
                        <div
                          key={index}
                          className={`seat ${
                            seat ? 'available' : 'unavailable'
                          } ${selectedSeats.includes(index) && selectedScreen?.id === screen.id ? 'selected' : ''} ${
                            selectedSeats.includes(index) ? 'booked' : ''
                          }`}
                          onClick={() => {
                            if (seat) {
                              handleSeatSelect(index, {
                                ...screen,
                                movie: selectedMovie,
                              });
                            }
                          }}
                        >
                          <div className='seat-number'>{index + 1}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className='booking-summary'>
        <div className='selected-screen'>
          {selectedScreen && (
            <div>
              <h3>Selected Screen: {selectedScreen.id}</h3>
              <p>Time: {selectedScreen.time}</p>
              <p>Movie: {selectedScreen.movie.title}</p>
            </div>
          )}
        </div>
        <div className='selected-seat'>
          {selectedScreen && selectedSeats?.length > 0 && (
            <div>
              <h3>Selected Seats: {selectedSeats.map((index) => index + 1).join(", ")}</h3>
              <h3>No of tickets: {selectedSeats?.length}</h3>
            </div>
          )}
        </div>
      </div>
      <button className='payment-button' onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length === 0}>Book Now</button>
    </div>
  );
};
