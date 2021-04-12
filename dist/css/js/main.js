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
        // const fileID=//couner
        //increment
        if(((file.size/1024)/1024)>4)return alert('File size exceeded! Max 4mb/img')
    });
}