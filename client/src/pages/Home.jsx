import React from 'react';
import { Link } from 'react-router-dom';

function Home () {
  const [ roomName, setRoomName ] = React.useState( "" );
  const [ rooms, setRooms ] = React.useState( [
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" },
    { id: 3, name: "Room 3" },
    { id: 4, name: "Room 4" },
    { id: 5, name: "Room 5" }
  ] );
  const [ error, setError ] = React.useState( "" );

  const handleCreateRoom = ( event ) => {
    event.preventDefault();
    if ( roomName.length < 3 || roomName.length > 10 ) {
      setError( "Room name must be between 3 and 10 characters" );
      return;
    }
    setRooms( [ ...rooms, { id: rooms.length + 1, name: roomName } ] );
    setRoomName( "" );
    setError( "" );
  };

  return (
    <div className="h-screen bg-green-500 flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col w-96">
        <form
          className="flex-grow flex flex-col justify-center"
          onSubmit={handleCreateRoom}
        >
          <h1 className="text-2xl uppercase mb-3">Create Room</h1>
          <hr className="mb-3" />
          <input
            type="text"
            value={roomName}
            onChange={( e ) => setRoomName( e.target.value )}
            placeholder="Enter room name"
            className="border border-gray-400 p-2 rounded w-full mt-3 mb-3 text-lg"
          />
          {error && (
            <span className="text-red-500 text-sm mb-3">{error}</span>
          )}
          <button className="bg-green-500 hover:bg-green-700 text-white p-2 rounded w-full mb-3">
            Create
          </button>
        </form>
        <div className="overflow-auto h-60">
          <h1 className="text-2xl uppercase mb-3">Rooms</h1>
          <hr className="mb-3" />
          <ul className="grid grid-cols-2 gap-4">
            {rooms.map( ( room ) => (
              <li
                key={room.id}
                className="bg-gray-100 rounded-lg p-3 shadow-md"
              >
                <Link
                  to={`/room/${ room.id }`}
                  className="text-green-500 hover:text-green-700 text-lg font-medium"
                >
                  {room.name}
                </Link>
              </li>
            ) )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
