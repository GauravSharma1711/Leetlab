import React, { useEffect } from 'react';
import usePlaylistStore from '../store/playlistStore';
import { MdDeleteForever } from 'react-icons/md'; 



const ViewPlaylist = () => {
    const { getPlaylistsDetails, playlists, deletePlaylist, deleteProblemFromPlaylist } = usePlaylistStore();

   

    useEffect(() => {
        getPlaylistsDetails();
    }, [getPlaylistsDetails]);

    // Corrected handleDeletePlaylist to take playlistId
    const handleDeletePlaylist = async(playlistId) => {
            deletePlaylist(playlistId);
            await getPlaylistsDetails()
           
    };

    // Corrected handleDeleteProblem to properly use a callback for onClick
    const handleDeleteProblem = async(playlistId, problemIds) => {
            deleteProblemFromPlaylist(playlistId, problemIds);
             await getPlaylistsDetails()
             
    };

    return (
        <div className='min-h-screen w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 bg-base-200'>
            {/* Header Section */}
            <div className='text-center mb-10'>
                <h1 className='text-5xl font-extrabold text-primary mb-4 animate-fade-in-down'>
                    My Playlists
                </h1>
                <p className='text-xl text-base-content opacity-90 max-w-2xl mx-auto'>
                    View and manage your custom problem collections.
                </p>
            </div>

            {/* Playlists Container Card */}
            <div className='card w-full max-w-3xl bg-base-100 shadow-xl mb-8 rounded-xl animate-fade-in-up'>
                <div className='card-body p-8'>
                    <h3 className='card-title text-2xl text-primary mb-6 text-center'>Your Collections</h3>

                    {/* Conditional rendering for playlists */}
                    {playlists && playlists.length > 0 ? (
                        <div className='flex flex-col gap-4'>
                           {playlists.map((playlist) => (
  <div key={playlist.id} className='collapse collapse-plus bg-base-200 rounded-lg shadow-md'>
    <input type='checkbox' />

    <div className='flex justify-between items-center pr-4'>
      {/* Collapsible Title Only */}
      <div className='collapse-title text-xl font-medium flex flex-col items-start'>
        <h4 className='text-xl font-bold text-base-content'>{playlist.name}</h4>
        {playlist.description && (
          <p className='text-sm text-base-content opacity-70 mt-1 line-clamp-1'>{playlist.description}</p>
        )}
        {playlist.createdAt && (
          <span className='text-xs text-gray-500 mt-1'>
            Created: {new Date(playlist.createdAt).toLocaleDateString('en-GB')}
          </span>
        )}
      </div>

      {/* Delete Playlist Button OUTSIDE collapse-title */}
      <button
        className='btn btn-ghost btn-circle btn-sm text-error hover:bg-error/20'
        onClick={(e) => {
          e.stopPropagation();
          handleDeletePlaylist(playlist.id);
        }}
        title='Delete Playlist'
      >
        <MdDeleteForever className='text-2xl' />
      </button>
    </div>

    {/* ✅ Only one collapse-content block here */}
    <div className='collapse-content bg-base-100/50 p-4 border-t border-base-300'>
      {playlist.problems && playlist.problems.length > 0 ? (
        <div className='flex flex-col gap-3'>
          <h4 className='text-lg font-semibold text-primary mb-2'>Problems:</h4>
          {playlist.problems.map((problem) => (
            <div key={problem.id} className='flex items-center justify-between bg-base-300 p-3 rounded-md shadow-sm'>
              <div className='flex flex-col flex-grow mr-4'>
                <span className='font-semibold text-base-content'>{problem.problem.title}</span>
                <span className='text-sm text-base-content opacity-70 line-clamp-1'>{problem.problem.description}</span>
              </div>
              <div className='flex items-center gap-3'>
                <div
                  className={`badge badge-sm ${
                    problem.problem.difficulty === 'EASY'
                      ? 'badge-success'
                      : problem.problem.difficulty === 'MEDIUM'
                      ? 'badge-warning'
                      : 'badge-error'
                  }`}
                >
                  {problem.problem.difficulty}
                </div>
                {/* Delete Problem Button */}
                <button
                  className='btn btn-ghost btn-sm btn-circle text-error hover:bg-error/20'
                  onClick={() => handleDeleteProblem(playlist.id, [problem.problem.id])}
                  title='Remove Problem'
                >
                  <MdDeleteForever className='text-lg' />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-base text-gray-500 text-center py-4'>No problems in this playlist yet.</p>
      )}
    </div>
  </div>
))}

                        </div>
                    ) : (
                        // Message when no playlists are created
                        <div className='text-center py-10'>
                            <p className='text-xl text-gray-500'>You haven't created any playlists yet.</p>
                            {/* Optional: Add a link or button to create a playlist */}
                            <Link to={'/createPlaylist'} >
                            <button className='btn btn-primary mt-6'>Create a New Playlist</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewPlaylist;