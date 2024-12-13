document.querySelectorAll('.ornament').forEach(ornament => {
    ornament.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.className);
    });
});

const tree = document.getElementById('tree');
tree.addEventListener('dragover', (e) => {
    e.preventDefault();
});

tree.addEventListener('drop', (e) => {
    e.preventDefault();
    const className = e.dataTransfer.getData('text/plain');
    const ornament = document.createElement('div');
    ornament.className = className;
    ornament.style.position = 'absolute';
    ornament.style.left = (e.offsetX - 15) + 'px';
    ornament.style.top = (e.offsetY - 15) + 'px';
    tree.appendChild(ornament);
});
