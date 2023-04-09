// app.js

// Helper function to format the beer data into HTML
function Home(beer) {
  return `
    <li>
      <a href="/biere/${beer.id}">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-bold">${beer.nom}</h2>
            <p class="text-gray-500">${beer.brasserie}</p>
          </div>
          <div>
            <p class="text-2xl font-bold">${beer.note_moy.toFixed(1)}</p>
            <p class="text-gray-500">${beer.nombre_note} ratings</p>
          </div>
        </div>
      </a>
    </li>
  `;
}

// Fetch the top 5 beers and render them on the homepage
fetch('http://127.0.0.1:8000/webservice/php/biere')
  .then((response) => response.json())
  .then((data) => {
    const beers = data.sort((a, b) => b.note_moy - a.note_moy).slice(0, 5);
    const html = beers.map(Home).join('');
    document.querySelector('ul').innerHTML = html;
  });

export default Home;
