const participants = [];

socket.on('user-joined', (user) => {
    participants.push(user);
    updateParticipantsList();
});

function updateParticipantsList() {
    const participantsList = document.getElementById('participants-list');
    participantsList.innerHTML = '';
    participants.forEach(participant => {
        const participantItem = document.createElement('div');
        participantItem.className = 'participant-item';
        participantItem.innerText = participant.name;
        participantsList.appendChild(participantItem);
    });
}

function displayParticipants() {
    const participantsContainer = document.createElement('div');
    participantsContainer.id = 'participants-container';

    const participantsList = document.createElement('div');
    participantsList.id = 'participants-list';

    participantsContainer.appendChild(participantsList);
    document.body.appendChild(participantsContainer);
}

displayParticipants();