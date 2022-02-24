import { Link } from 'react-router-dom';

export default function PostModalHeader({
  postUserUsername,
  postUserFullName,
  postUserProfileImageSrc,
  activeBtnFollow,
  isFollowingProfile,
  handleToggleFollow,
}) {
  return (
    <header className="flex items-center h-8 border-b border-gray-transparent py-8 px-4">
      <div className="w-11 h-11 rounded-full mr-3">
        <img
          src={postUserProfileImageSrc}
          alt={`${postUserUsername} img`}
          className="rounded-full w-full h-full border border-gray-transparent object-cover
"
        />
      </div>
      <div className="flex flex-col justify-center mr-5">
        <Link to={`/p/${postUserUsername}`}>
          <p className=" font-semibold text-sm text-black-light">
            {postUserUsername}
          </p>
        </Link>
        <p className="text-xs text-gray-light">{postUserFullName}</p>
      </div>
      <div className="flex items-center">
        {activeBtnFollow ? (
          <>
            <div
              className={`mr-1 ${isFollowingProfile ? '' : 'text-blue-light'}`}
            >
              •
            </div>
            <button
              className={`font-semibold text-sm rounded ${
                isFollowingProfile
                  ? 'text-black-light w-16'
                  : 'text-blue-light w-12'
              } h-8 tracking-wide`}
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Following' : 'Follow'}
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}