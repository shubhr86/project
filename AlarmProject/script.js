function updateTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    document.getElementById('clock').innerText = `${hours}:${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)} ${ampm}`;
}

function formatTimeComponent(component) {
    return component < 10 ? '0' + component : component;
}

function setAlarm() {
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const second = document.getElementById('second').value;
    const ampm = document.getElementById('ampm').value;

    //handle edge caes

    if (hour < 1 || hour > 12 || minute < 0 || minute >= 60 || second < 0 || second >= 60) {
        alert('Please enter valid time values.');
        return;
    }

    const alarmTime = `${hour}:${formatTimeComponent(minute)}:${formatTimeComponent(second)} ${ampm}`;
    const alarmItem = document.createElement('li');
    alarmItem.className = 'alarmItem';
    alarmItem.innerHTML = `${alarmTime} <input type="checkbox" class="selectCheckbox">`;
    document.getElementById('alarmsList').appendChild(alarmItem);

    // Schedule the alarm when setting it
    scheduleAlarm(alarmTime);

    // Show the alarmsList
    document.getElementById('alarmsList').style.display = 'block';
  
}


function scheduleAlarm(alarmTime) {
    const now = new Date();
    const alarmDateTime = new Date(now.toDateString() + ' ' + alarmTime);
    const timeDifference = alarmDateTime - now;

    if (timeDifference > 0) {
        setTimeout(() => {
            playAlarmSound();
        }, timeDifference);
    }
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.selectCheckbox');

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}
  
// function deleteSelectedAlarms() {
//     const checkboxes = document.querySelectorAll('.selectCheckbox:checked');

//     const isConfirmed = confirm('Are you sure to delete the alarm?');

//     if (isConfirmed) {
//         checkboxes.forEach(checkbox => {
//             const listItem = checkbox.parentNode;
//             listItem.parentNode.removeChild(listItem);
//         });
//     }
// }

function deleteSelectedAlarms() {
    const checkboxes = document.querySelectorAll('.selectCheckbox:checked');
    const isConfirmed = confirm('Are you sure to delete the alarm?');

    if (isConfirmed) {
        checkboxes.forEach(checkbox => {
            const listItem = checkbox.parentNode;
            if (listItem) {
                const listContainer = listItem.parentNode;
                if (listContainer) {
                    listContainer.removeChild(listItem);
                    console.log('Alarm deleted:', listItem.innerText);
                } else {
                    console.error('Error finding list container for alarm:', listItem);
                }
            } else {
                console.error('Error finding list item for checkbox:', checkbox);
            }
        });

        // Check if there are any remaining alarms
        const remainingAlarms = document.querySelectorAll('.alarmItem');

        // If there are no remaining alarms, hide the alarmsList
        const alarmsList = document.getElementById('alarmsList');
        if (remainingAlarms.length === 0 && alarmsList) {
            alarmsList.style.display = 'none';
            console.log('No remaining alarms. Hiding alarmsList.');
        } else {
            console.log('Remaining alarms:', remainingAlarms.length);
        }

        // Always show the delete button container
        const deleteButtonContainer = document.getElementById('deleteButtonContainer');
        if (deleteButtonContainer) {
            deleteButtonContainer.style.display = 'block';
            console.log('Showing delete button container.');
        } else {
            // If delete button container is not found, create it
            const newDeleteButtonContainer = document.createElement('div');
            newDeleteButtonContainer.id = 'deleteButtonContainer';
            newDeleteButtonContainer.className = 'mt-3 deleteButtonContainer';
            newDeleteButtonContainer.innerHTML = `
                <input type="checkbox" class="selectCheckbox" id="selectAllCheckbox" onchange="toggleSelectAll()"> Select All
                <button type="button" id="deleteSelectedButton" onclick="deleteSelectedAlarms()" class="btn btn-danger ml-2">Delete Selected</button>
            `;
            document.getElementById('alarmForm').appendChild(newDeleteButtonContainer);
            console.log('Created and showing delete button container.');
        }
    }
}




function playAlarmSound() {
    const audio = document.getElementById('alarmAudio');

    // Check if the audio element is supported
    if (audio && typeof audio.play === 'function') {
        audio.play();
    } else {
        // Fallback to alert if audio is not supported
        alert('Alarm is ringing!');
    }
}

// Initial clock update
updateTime();

// Update clock every second
setInterval(updateTime, 1000); 

