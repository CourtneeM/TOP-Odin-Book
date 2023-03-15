import closeIcon from '../../assets/icons/close.png';

function LikeCard({ content, users }) {
  const toggleDisplayWhoLikes = (target) => {
    target.parentElement.classList.contains('hidden') ?
    target.parentElement.classList.remove('hidden') :
    target.parentElement.classList.add('hidden');
  }

  return (
    <div id={`who-likes-${content._id}-container`} className='who-likes-container hidden'>
      <p className="container-title">Users who liked this:</p>
      <ul>
        {  
          users && content.likes.map((userId) => {
            const userList = users.filter((user) => user.id === userId)
            return userList.map((user) => <li>{user.firstName} {user.lastName}</li>)
          })
        }
      </ul>

      <img className="close-who-likes-container" src={closeIcon} alt="x" onClick={(e) => toggleDisplayWhoLikes(e.target)} />
    </div>
  );
}

export default LikeCard;