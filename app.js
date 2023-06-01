// TMDB data
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTU5Njk4N2E1MTVhNjJiMTUxOTVkN2FkYjQ0MDQ1MiIsInN1YiI6IjY0NzQ1MTY5ZGQ3MzFiMmQ3OWQyMDg1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gkKKMUGw3X3AYSmMDvzYol0_wvjLEqvYknKfW6usBxM'
    }
  };

// 검색용 movieArr배열 생성
const movieArr = [];
const searchBtn = document.querySelector("#search-box button")
const mainPage = document.querySelector(".mycards");

function getMovies(){
    // jQuery의 .empty로 temp_html을 본분에 삽입전 기본의 내용 제거
    // forEach문안에 있을경우 이전 삽입한내용이 사라지기때문에 forEach문 밖에서 선언
    document.querySelector(".mycards").innerHTML=""    
    fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
        .then(res => res.json())
        .then(data => { 
            // 검색기능을 사용할때 필요한 배열 추가
            movieArr.push(data['results']);

            const allMovies = data['results'];
            
            allMovies.forEach(movie =>{
                const title = movie.title
                const average = movie.vote_average;
                const overview = movie.overview;
                const img = movie.backdrop_path;
                const id = movie.id
                // card-box를 클릭시 영화 id를 alert 해주는 onClick 이벤트 추가
                const temp_html = `<div class="card-box" onClick="alert('영화 id: ${id}')">
                                        <div>
                                            <img class="card-img" src="https://image.tmdb.org/t/p/w500/${img}" />
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">${title}</h5>
                                            <p class="vote-average">⭐${average}</p>
                                            <p class="card-overview">${overview}</p>
                                        </div>
                                    </div>`
                document.querySelector(".mycards").insertAdjacentHTML("beforeend", temp_html);
                })
            })

    }
// 페이지 로드 완료(스타일 시트, 이미지, 하위 프레임의 로딩은 기다리지 않습니다.) 시 getMovies 함수를 실행하여 메인페이지에 띄워주는 코드
document.addEventListener("DOMContentLoaded", () =>{
    getMovies()
})

// 검색기능 구현
function searchMovie() {
    // 검색창의 input값을 text 에 넣어준다.
    const text = document.querySelector("#search-box input").value
    // IGNORECASE(i) 대소문자에 관계없이 매치를 가능하게 해준다.
    const reg = new RegExp(text, "i");
    const findMovies = [];

   movieArr[0].forEach((movie) =>{
    // test()를 사용하여 reg 가 movie.title에 일치하는 것을 찾아
    if (reg.test(movie.title)){
        // findMovies 배열에 push 한다. 
        findMovies.push(movie)}
    })
    // 검색시 최소 입력 글자 3자이상 설정
    if (text.length < 3){
        alert("3글자 이상 입력해 주세요!")
    // 검색시 일치하는 값이 하나도 없을 경우 설정
    } else if (findMovies.length === 0){
        alert("일치하는 영화가 없습니다.")
    }else{     
    // 검색한 새로운 데이터를 넣기전 기존에 있던 정보를 비움
        mainPage.innerHTML=""
        findMovies.forEach(movie =>{
        const temp_html = `<div class="card-box" onClick="alert('영화 id: ${movie.id}')">
                            <div>
                                <img class="card-img" src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" />
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="vote-average">⭐${movie.vote_average}</p>
                                <p class="card-overview">${movie.overview}</p>
                            </div>
                        </div>`
        // 검색값과 일치한 temp_html을 추가한다
        mainPage.innerHTML += temp_html
        })
    }
}
// 검색 버튼"click"인 "event"를 하면 searchMovie함수
searchBtn.addEventListener("click", searchMovie)
