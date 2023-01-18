import orve, { ref } from "orve";

const randomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

const arrayColor = ["red", "orange", "green"];

const App = () => {
  const array = new Array(100).fill(0).map((e, i) => ({
    id: i + 1,
    timer: null,
    count: -1,
    status: "disabled",
    numberColor: null,
  }));

  const ar = ref(array);

  const startSerach = () => {
    ar.value.forEach((e, i) => {
      const timer = randomInteger(1,5000);
      const obj = e;
      obj.timer = timer;
      obj.status = "processing";
      obj.count = -1;
      obj.numberColor = null;
      ar.value[i] = obj;

      setTimeout(() => {
        obj.count = randomInteger(1, 10);

        if (obj.count < 5) {
          obj.status = "error";
          obj.numberColor = 0;
        } else if (obj.count >= 5 && obj.count <= 7){
          obj.status = "good";
          obj.numberColor = 1;
        } else if (obj.count >= 8) {
          obj.status = "done";
          obj.numberColor = 2;
        }
        ar.value[i] = obj;
      }, timer);
    });
  }

  return (
    <>
      <h2>Test Perfomance - orve</h2>
      <div>
        <div>
          <button class="btn" onClick={startSerach}>Start All</button>
        </div>
        <div class="body-label">
          {ar.forList((e) => {
            const style = {
              backgroundColor: arrayColor[e.numberColor]
            }
            return (
              <div class="btn-label" style={style}>
                <span>
                  {e.id}<br />
                  {e.status}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App;