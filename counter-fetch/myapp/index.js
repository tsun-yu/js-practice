/* put http://localhost:3000/counter/1

req
{
    "total": 1000
}

res
{
    "total": 1000,
    "id": 1
}
*/

/* get http://localhost:3000/counter/1
{
  "id": 1,
  "total": 999
}
*/
const slr = (name) => document.querySelector(name);

const getDataFromServer = async () => {
  try {
    const response = await fetch(" http://localhost:3000/counter/1");
    if (!response.ok) throw new Error("somthing wrong");
    const data = await response.json();
    // console.log("response", response);
    // console.log("data", data);
    slr("#total").innerHTML = data.total;
  } catch (error) {
    console.log(error);
  }
};

const putDataFromServer = async (total) => {
  try {
    const newData = { total: total };
    const response = await fetch(" http://localhost:3000/counter/1", {
      method: "PUT",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(newData),
    });
    if (!response.ok) throw new Error("somthing wrong");
    // console.log("newData", newData);
    // console.log("JSON.stringify(newData)", JSON.stringify(newData));
    // const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};

getDataFromServer();

slr("#add").addEventListener("click", () => {
  const newTotal = +slr("#total").innerHTML + 1;
  putDataFromServer(newTotal);
  slr("#total").innerHTML = newTotal;
});

slr("#minus").addEventListener("click", () => {
  const newTotal = +slr("#total").innerHTML - 1;
  putDataFromServer(newTotal);
  slr("#total").innerHTML = newTotal;
});
