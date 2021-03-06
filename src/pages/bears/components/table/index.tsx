import { memo, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { bearTypeArr, useBears } from "../..";
import { getRandomInt } from "../../../../util/random-int";

const BearTable = () => {
  const { bears, addBear, getBear, deleteBear } = useBears();

  const handleAddBear = useCallback(() => {
    if (bears.length >= 6) {
      alert("Max bear tower reached!");
      return;
    }
    fetch(`https://dummyjson.com/users/${getRandomInt(100)}`)
      .then((res) => res.json())
      .then((data) => {
        if (getBear(data.id)) {
          // Just a simple (and intentionally dumb) way to prevent duplicates within
          // the 100 user sample size form dummy json. Rerun to attempt to get a unique user.
          handleAddBear();
          return;
        }

        addBear({
          id: data.id,
          type: bearTypeArr[getRandomInt(3)], // Choose a random bear type.
          name: data.firstName,
        });
      });
  }, [bears]);

  return (
    <div style={{ height: "100vh" }}>
      <h1 className="mt-3">Bear Tower</h1>
      <p>
        Why bears? Seems to be the{" "}
        <a
          href="https://codesandbox.io/s/github/pmndrs/zustand/tree/main/examples"
          target="_blank"
          rel="noreferrer"
        >
          zustand way.
        </a>
      </p>
      <div>
        <button className="btn btn-primary my-3" onClick={handleAddBear}>
          Add to Bear Tower
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bears.map((bear) => {
            return (
              <tr key={bear.id}>
                <td>{bear.id}</td>
                <td>{bear.name}</td>
                <td>{bear.type}</td>
                <td className="text-end">
                  <a
                    href="/#"
                    className="link-secondary"
                    onClick={() => deleteBear(bear.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default memo(BearTable);
