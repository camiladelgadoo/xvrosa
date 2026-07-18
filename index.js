// FECHA: 11 de setiembre de 2026 (el numero del mes es 1 menos)
    const eventDate = new Date(2026, 8, 5, 22, 0, 0);
//const eventDate = new Date(2026, 6, 7, 22, 0, 0);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
      
        if (distance <= 0) {

    clearInterval(countdownInterval);

    document.getElementById("countdown").style.display = "none";
    document.getElementById("partyMessage").style.display = "block";

    return;
}
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (86400000)) / (3600000));
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);
        document.getElementById('days').innerHTML = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
   
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Música
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    let isPlaying = false;
    musicBtn.addEventListener('click', () => {
        if(isPlaying) {
            music.pause();
            musicBtn.style.opacity = "0.7";
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            music.play().catch(e => console.log("Autoplay bloqueado:", e));
            musicBtn.style.opacity = "1";
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        }
        isPlaying = !isPlaying;
    });
    document.body.addEventListener('click', function initAudio() {
        if (!isPlaying) {
            music.play().then(() => { isPlaying = true; musicBtn.innerHTML = '<i class="fas fa-music"></i>'; }).catch(()=>{});
        }
    }, { once: true });

    // Modal y WhatsApp
    const modal = document.getElementById('rsvpModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeSpan = document.querySelector('.close-modal');
    openBtn.onclick = () => modal.style.display = 'flex';
    closeSpan.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

    // Cambia este número por el WhatsApp de la organizadora (código país + número)
    const TELEFANO_ORGANIZADOR = "59894241262"; // REEMPLAZAR

    const rsvpForm = document.getElementById('rsvpForm');
    const formMsg = document.getElementById('formMsg');

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const asistencia = document.getElementById('asistencia').value;
        let acompanantes = document.getElementById('acompanantes').value;
        if (!nombre || !asistencia) {
            formMsg.innerText = "Por favor, completa tu nombre y si asistirás.";
            formMsg.style.color = "#b1624b";
            return;
        }
        if (acompanantes === "") acompanantes = "0";
        
       let mensaje = `*Confirmación de asistencia - 15 años de Milagros*%0A`;
mensaje += `━━━━━━━━━━━━%0A%0A`;

mensaje += `Nombre: ${encodeURIComponent(nombre)}%0A`;
mensaje += `Asistencia: ${encodeURIComponent(asistencia)}%0A`;
mensaje += `Acompañantes: ${acompanantes}%0A%0A`;

mensaje += `━━━━━━━━━━━━%0A`;
mensaje += `📅 Fecha: Viernes 11 de Setiembre, 22:00 hs%0A`;
mensaje += `📍 Salón "El Dorado"%0A`;
mensaje += `━━━━━━━━━━━━%0A%0A`;

mensaje += `✅ Confirmación antes del 15 de Agosto.%0A`;
mensaje += `¡Gracias! 💚🐸👑`;
        
        const urlWhatsApp = `https://wa.me/${TELEFANO_ORGANIZADOR}?text=${mensaje}`;
        window.open(urlWhatsApp, '_blank');
        formMsg.innerText = "✅ Abriendo WhatsApp... Envía el mensaje para confirmar.";
        formMsg.style.color = "#2a6b47";
        
        setTimeout(() => {
            modal.style.display = 'none';
            rsvpForm.reset();
            formMsg.innerText = "";
        }, 2000);
    });