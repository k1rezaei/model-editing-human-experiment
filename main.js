
log = {}
record_id = -1

function handleKeyPress(event) {
    if (event.key === 's') {
        saveProgress();
    }
    else if (event.key == 'n') {
        handleSelection();
    } else if (event.key == '1') {
        document.getElementById('o1').checked = true;
    } else if (event.key == '2') {
        document.getElementById('o2').checked = true;
    } else if (event.key == '3') {
        document.getElementById('o3').checked = true;
    } else if (event.key == '4') {
        document.getElementById('o4').checked = true;
    } else if (event.key == '5') {
        document.getElementById('o5').checked = true;
    }
  }

  // Add event listener to the document
  document.addEventListener('keydown', handleKeyPress);

function init(){
    fetch('log.json')
    .then(response => response.json())
    .then(data => {
        log = data;
        updateImages()
    }).catch(error => console.error('Error fetching JSON:', error));
    
}

function getFirstUnrated() {
    record_id = 0
    for (record of log) {
        if (record["edit_score"] == "-1") {
            return record;
        }
        record_id += 1;
    }

    return null;
}

function getQuestion(type, hint) {
    if (type == 'style') {
        return `<font size=3><b>Q:</b> Has the <u><i>artistic style</i></u> <b>(` + hint + `)</b> been decreased from original image (Left) compared to modified image (Right)?
        </font><br><h5><font color="#BB0044"><b>5</b> -- maximally removed</font><br><font color="#4400BB"> <b>1</b> -- not removed</font></h5>`
    }
    else if (type == 'object') {
        return `<font size=3><b>Q:</b> Has the <u><i>main object</i></u> <b>(` + hint + `)</b> been modified from original image (Left) compared to modified (Right)?</font>
        <br><h5><font color="#BB0044">5 -- maximally modified (` + hint + ` is not there anymore) </font><br><font color="#4400BB"> <b>1</b> -- not modified at all (` + hint + ` is still there)</font></h5>`
    }
    else {
        return `<font size=3><b>Q:</b> Has <u><i>the fact</i></u> <b>(` + hint + `)</b> been updated from original image (Left) compared to modified (Right)?</font>
        <br><h5><font color="#BB0044">5 -- maximally updated</font><br><font color="#4400BB"> <b>1</b> -- not updated at all</font></h5>`
    }
}

function updateImages() {
    record = getFirstUnrated();
    if (record != null) {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = `
        <img src="${record['original_url']}" width="512" alt="Image with particular style/object/fact">
        <img src="${record['modified_url']}" width="512" alt="Image without particular style/object/fact">
        <br>
        <p>${getQuestion(record['type'], record['hint'])}</p>
        <label>
            <input type="radio" id="o1" name="q1" value="1" required>
            <label for="o1"><b>1</b></label><br>
            
            <input type="radio" id="o2" name="q1" value="2" required>
            <label for="o2"><b>2</b></label><br>
            
            <input type="radio" id="o3" name="q1" value="3" required>
            <label for="o3"><b>3</b></label><br>
            
            <input type="radio" id="o4" name="q1" value="4" required>
            <label for="o4"><b>4</b></label><br>

            <input type="radio" id="o5" name="q1" value="5" required>
            <label for="o5"><b>5</b></label><br>
        </label>
        <button onclick="handleSelection()">Next</button>
        <button onclick="saveProgress()">Save Your Progress</button>
      `;
    }else {
        saveProgress();
        imageContainer.innerHTML = 'Done';
        alert("thank you! you have succesfully responed to all of our questions!\nplease send `log.json` to us.");
        return ;
    }
}

function saveJsonFile(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function saveProgress() {
    saveJsonFile(JSON.stringify(log), 'log.json', 'text/plain')
}

function handleSelection() {
    const score = document.querySelector('input[name="q1"]:checked')?.value;
    if (score) {
        console.log(`Participant selection for: ${log[record_id]} is ${score}`);
        log[record_id]['edit_score'] = score;
        updateImages();
    } else {
        alert('Please give us rating (1-5) before proceeding.');
    }
}

init();

