document.addEventListener('DOMContentLoaded', function () {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    let tooltip = document.getElementById('img-tooltip');
    tooltip.innerText = 'Hack the planet!';

    let imgElement = document.getElementById('img');
    document.getElementById('vid');
    if (imgElement) {
        imgElement.addEventListener('mousemove', function (e) {
            tooltip.style.display = 'block';
            tooltip.style.top = (e.clientY + window.scrollY + 10) + 'px';
            tooltip.style.left = (e.clientX + window.scrollX + 10) + 'px';
        });

        imgElement.addEventListener('mouseleave', function () {
            tooltip.style.display = 'none';
        });
    }
});