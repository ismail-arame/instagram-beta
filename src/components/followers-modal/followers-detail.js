import { useState, useContext, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  toggleFollow,
  getUserByUserId,
} from '../../services/firebase';

import { useSelector, shallowEqual } from 'react-redux';
import { selectFollowersModalOpen } from '../../redux/followers-modal/followers-modal.selectors';

export default function FollowersDetail({ loggedInUser, followerUser }) {
  const [isLoading, setLoading] = useState(false);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [isLazyLoading, setLazyLoading] = useState(false);
  const followersModalOpen = useSelector(
    selectFollowersModalOpen,
    shallowEqual
  );

  //whether to show the btn Follow or not
  const activeBtnFollow =
    loggedInUser?.username && loggedInUser?.username !== followerUser?.username;

  const handleToggleFollow = async () => {
    setIsFollowingProfile(isFollowingProfile => !isFollowingProfile);

    await toggleFollow(
      loggedInUser.docId,
      followerUser.userId, //profileUserId
      followerUser.docId, //profileDocId
      loggedInUser.userId, //followingUserID => logged in user is the one that follows the profile User
      isFollowingProfile
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      setLoading(true);
      //to get all recent changes when a user toggle profile following functionality
      //when a user closes and opens the following modal we want to show him the latest things
      const [activeUser] = await getUserByUserId(loggedInUser.userId);
      const isFollowing = activeUser.following.includes(followerUser.userId);

      setIsFollowingProfile(isFollowing);
      setLoading(false);
    };

    if (loggedInUser.following && followerUser.userId)
      isLoggedInUserFollowingProfile();
  }, [loggedInUser, followerUser, followersModalOpen]);

  return (
    <div className="rounded flex flex-row items-center justify-between w-full px-4 py-2">
      <div className="flex items-center justify-between">
        <div
          className={`rounded-full w-9 h-9 mr-3 transition-colors  ${
            isLazyLoading ? 'bg-gray-lazy2 animate-pulse-faster' : ''
          }`}
        >
          <LazyLoadImage
            width="100%"
            height="100%"
            effect="opacity"
            src={followerUser.profileImageSrc}
            alt="user profile"
            className="rounded-full w-full h-full flex object-cover border border-gray-transparent"
            beforeLoad={() => setLazyLoading(true)}
            afterLoad={() => setLazyLoading(false)}
            onError={e => {
              e.target.src = '/images/avatars/default.png';
            }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className=" font-semibold text-sm text-black-light">
            {followerUser.username}
          </p>
          <p className="text-xs text-gray-light">{followerUser.fullName}</p>
        </div>
      </div>
      {isLoading ? null : activeBtnFollow ? (
        <button
          className={`font-semibold text-sm rounded tracking-wide py-[5px] px-[9px] focus:outline-none ${
            isFollowingProfile
              ? 'bg-gray-background border border-gray-transparent text-black-light'
              : 'bg-blue-light text-white'
          }`}
          type="button"
          onClick={handleToggleFollow}
        >
          {isFollowingProfile ? 'Following' : 'Follow'}
        </button>
      ) : null}
    </div>
  );
}
