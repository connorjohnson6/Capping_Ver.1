/* Adds functionality to landing profile page. Such as uploading a profile picture. However, profile section was eventually 
abandoned for a React-based profile instead. There is no back-end functionality attached to these functions. */

function uploadProfilePic() {
    const input = document.getElementById('profilePicInput');
    input.click();
}

function submitProfilePic() {
    const input = document.getElementById('profilePicInput');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgContainer = document.querySelector('.profile-pic-container img') || 
                                 document.createElement('img');
            imgContainer.src = e.target.result;
            imgContainer.alt = "Profile Picture";
            imgContainer.classList.add('mb-3', 'text-dark');
            const placeholder = document.querySelector('.profile-placeholder');
            if (placeholder) placeholder.remove();
            document.querySelector('.profile-pic-container').prepend(imgContainer);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function showFriendsPopup() {
    const backdrop = document.querySelector('.backdrop');
    const friendsPopup = document.querySelector('.friends-popup');

    backdrop.style.display = 'block';

    // Close the pop-up when the backdrop is clicked
    backdrop.addEventListener('click', hideFriendsPopup);

    // Prevent the pop-up from closing when it is clicked directly
    friendsPopup.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    adjustFriendNames();
}


// In your /js/profile.js or directly in a <script> tag on the page:

function showFriendsPopup() {
    document.querySelector('.backdrop').style.display = 'block';
}

function hideFriendsPopup() {
    document.querySelector('.backdrop').style.display = 'none';
}

function adjustFriendNames() {
    const maxNameWidth = 150;  // Adjust this as per your requirements
    const friendNames = document.querySelectorAll('.friend-name');

    friendNames.forEach(nameElem => {
        let name = nameElem.textContent;

        // Check if the width exceeds the maxNameWidth
        while (nameElem.offsetWidth > maxNameWidth && name.length > 1) {
            name = name.substring(0, name.length - 1);
            nameElem.textContent = name + '...';
        }
    });
}

function redirectToQuiz() {
    window.location.href = "https://footprint.conservation.org/en-us/";
}

function showEditProfilePopup() {
    document.querySelector('.edit-profile-backdrop').style.display = 'block';
}

function hideEditProfilePopup() {
    document.querySelector('.edit-profile-backdrop').style.display = 'none';
}

