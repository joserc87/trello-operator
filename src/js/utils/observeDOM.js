
// Credit from https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom/14570614#14570614
const getObserveDOM = () => {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

  return function( obj, callback ){
    if (!obj || !obj.nodeType === 1) return // validation

    if (MutationObserver) {
      // define a new observer
      var obs = new MutationObserver(function(mutations, observer) {
          callback(mutations)
      })
      // have the observer observe foo for changes in children
      obs.observe( obj, { childList:true, subtree:true })
    } else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
}

export default getObserveDOM()
