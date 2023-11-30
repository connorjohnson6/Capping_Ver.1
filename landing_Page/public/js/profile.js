/**
 * Script containing various UI interaction functions for a web page.
 *
 * This script includes functions for handling profile picture upload, displaying and hiding pop-ups,
 * adjusting the display of elements like friend names, and redirecting the user to external links.
 * These functions are typically used in response to user actions like clicks.
 *
 * @fileoverview UI interaction functions for profile picture upload, pop-up management, and more.
 * @author [Andrew Bernal, Connor Johnson]
 */


/**
 * Triggers a click event on the hidden file input to upload a profile picture.
 */
function uploadProfilePic() {
    const input = document.getElementById('profilePicInput');
    input.click();
}

/**
 * Handles the submission of the selected profile picture.
 * 
 * Reads the selected file using FileReader and updates the image source on the page.
 */
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

/**
 * Displays the friends pop-up along with a backdrop.
 */
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

// function showFriendsPopup() {
//     document.querySelector('.backdrop').style.display = 'block';
// }

/**
 * Hides the friends pop-up by hiding the backdrop.
 */
function hideFriendsPopup() {
    document.querySelector('.backdrop').style.display = 'none';
}

/**
 * Adjusts the display of friend names to ensure they fit within a specified width.
 */
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

/**
 * Redirects the user to an external quiz page.
 */
function redirectToQuiz() {
    window.location.href = "https://footprint.conservation.org/en-us/";
}

/**
 * Displays the edit profile pop-up.
 */
function showEditProfilePopup() {
    document.querySelector('.edit-profile-backdrop').style.display = 'block';
}

/**
 * Hides the edit profile pop-up.
 */
function hideEditProfilePopup() {
    document.querySelector('.edit-profile-backdrop').style.display = 'none';
}

