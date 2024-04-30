export async function getUser(address: string) {
  return await fetch("/api/get-user?address=" + address);
}

export async function createUser(address: string) {
  const newUserData = {
    name: address,
    address,
    image: "/",
  };

  return await fetch("/api/create-user", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUserData),
  });
}

export async function userFunction(address: string) {
  const user = await getUser(address);

  if (user.ok) {
    return user.json();
  } else {
    const newUser = await createUser(address);

    if (newUser.ok) {
      console.log("success!");
    }
  }
}
