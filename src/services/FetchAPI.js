const FetchAPI = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    Object.entries(data.results).forEach((planet) => delete planet[1].residents);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export default FetchAPI;
