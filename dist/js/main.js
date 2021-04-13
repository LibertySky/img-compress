import Counter from './Counter.js'
const counter= new Counter;

const initApp = () => {
    const droparea = document.querySelector('.droparea');

    const active = () => droparea.classList.add("green-border");

    const inactive = () => droparea.classList.remove("green-border");

    const prevents = (e) => e.preventDefault();

    ['dragover', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });

    ['dragenter', 'dragover'].forEach(evtName => {
        droparea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, inactive);
    });

    droparea.addEventListener("drop", handleDrop);

}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    const filesArray = [...files];
    // console.log(files); // FileList
    // console.log(fileArray);
    if(filesArray.length>20)return alert('Too many files! Limit is 20')
    handleFiles(filesArray);
}

const handleFiles=(filesArray)=>{
    filesArray.forEach(file => {
        const fileID=counter.getValue;
        counter.incrementValue;
        if(((file.size/1024)/1024)>4)return alert('File size exceeded! Max 4mb/img');
        createResult(file, fileID);
        uploadFile(file, fileID);
    });
}

const createResult = (file, fileID) => {
    const origFileSizeString = getFileSizeString(file.size);

    const p1 = document.createElement("p");
    p1.className = "results__title";
    p1.textContent = file.name;

    const p2 = document.createElement("p");
    p2.className = "results__size";
    p2.textContent = origFileSizeString;

    const divOne = document.createElement("div");
    divOne.appendChild(p1);
    divOne.appendChild(p2);

    const progress = document.createElement("progress");
    progress.id = `progress_${file.name}_${fileID}`;
    progress.className = "results__bar";
    progress.max = 10;
    progress.value = 0;

    const p3 = document.createElement("p");
    p3.id = `new_size_${file.name}_${fileID}`;
    p3.className = "results__size";

    const p4 = document.createElement("p");
    p4.id = `download_${file.name}_${fileID}`;
    p4.className = "results__download";

    const p5 = document.createElement("p");
    p5.id = `saved_${file.name}_${fileID}`;
    p5.className = "results__saved";

    const divDL = document.createElement("div");
    divDL.className = "divDL";
    divDL.appendChild(p4);
    divDL.appendChild(p5);

    const divTwo = document.createElement("div");
    divTwo.appendChild(p3);
    divTwo.appendChild(divDL);

    const li = document.createElement("li");
    li.appendChild(divOne);
    li.appendChild(progress);
    li.appendChild(divTwo);

    document.querySelector('.results__list').appendChild(li);
    displayResults();
}

const getFileSizeString = (filesize) => {
    const sizeInKB = parseFloat(filesize) / 1024;
    const sizeInMB = (sizeInKB / 1024);
    return sizeInKB > 1024 ? `${sizeInMB.toFixed(1)} MB` : `${sizeInKB.toFixed(1)} KB`;
}

const displayResults = () => {
    const results = document.querySelector('.results');
    if (results.classList.contains('none')) {
        results.classList.remove('none');
        results.classList.add('block');
    }
}