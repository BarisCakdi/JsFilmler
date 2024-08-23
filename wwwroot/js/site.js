let films = [];

function addRecord(film) {
    films.push(film);
    films.sort((a, b) => b.puan - a.puan);
    render();
}


function render() {
    filmTablosu.innerHTML = '';
    for (let film of films)
    {
        filmTablosu.innerHTML += `
            <td>${film.isim}</td>
            <td>${film.kategori}</td>
            <td>${film.konu}</td>
            <td>${film.puan}</td>
            <td><img src="${film.resim}" alt="Film Resmi" style="width: 100px; height: auto;" /></td>
            <td><button class="btn btn-danger deleteBtn ">Sil</button></td>
            `
    }
    bindEvents();
}
function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(filmForm);
    let formObj = Object.fromEntries(formData);
    let file = formData.get('resim');
    let reader = new FileReader();
    reader.onload = function () {
        formObj.resim = reader.result;
        addRecord(formObj);
        filmForm.reset();
    }
    reader.readAsDataURL(file);
}

filmForm.addEventListener('submit', handleSubmit);

function bindEvents() {
    let deleteBtns = document.querySelectorAll('.deleteBtn');
    for (let btn of deleteBtns) {
        btn.addEventListener('click', deleteRow);
    }
}

function deleteRow() {
    if (confirm('Eminmisin?')) {
        this.parentElement.parentElement.remove();
    }
}