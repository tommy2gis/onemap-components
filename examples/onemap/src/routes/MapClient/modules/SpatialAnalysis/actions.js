const ANALYSIS_LIST = 'ANALYSIS_LIST';
const BUFFER_LIST = 'BUFFER_LIST';
const INTERSECT_LIST='INTERSECT_LIST';
const CLEAR_LIST="CLEAR_LIST";

function getAnalysisList(result,geotype) {
    return {
        type: ANALYSIS_LIST,
        result,
        geotype
    };
}
function setBufferList(result) {
    return {
        type: BUFFER_LIST,
        result,
    };
}

function setIntersectList(result) {
    return {
        type: INTERSECT_LIST,
        result,
    };
}

function clearList() {
    return {
        type: CLEAR_LIST
    };
}







export {  
    getAnalysisList,
    ANALYSIS_LIST,
    BUFFER_LIST,
    setBufferList,
    setIntersectList,
    INTERSECT_LIST,
    CLEAR_LIST,
    clearList
};