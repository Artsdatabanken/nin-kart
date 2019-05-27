// Material-UI generates random component ids.
// In order to test with Jest generate constant ids.
let id = 0;

//export function resetComponentIds () { id = 0 }
export default function getNext() {
  id++;
  return id.toString();
}
