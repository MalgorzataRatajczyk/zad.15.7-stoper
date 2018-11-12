"use strict"

// klasa Stopwatch
class Stopwatch extends React.Component {
    constructor(props) { //konstruktor
        super(props);
        this.state = {
            running: false, //wartość początkowa stopera - stoper nie pracuje
            display: '',
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        }
    }

    //implementacja metod, które będą wykonywane po kliknięciu w odpowiedni przycisk
    // metoda reset - zeruje stoper
    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    // metoda print ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display
    print() {
       this.setState({
           display: this.format(this.state.times)
       })
    }

    /* metoda format zajmuje się przygotowaniem tekstu do wyświetlenia. Metoda ta zwraca szablon,
    który wykorzystuje obiekt (times) podany do metody. Korzystamy w tym miejscu z konstrukcji ${nazwa_zmiennej},
    która umożliwia nam przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementu szablonu. */ 
    format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    pad0(value) {
        let result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
    }  
    /* Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych. Funkcja ta przyjmuje na wejście wartość liczbową,
    przekształca ją na stringa, a następnie sprawdza czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym
    zero przed tę liczbę. */

    start() {
        if (!this.state.running) { //sprawdzenie czy stoper nie jest uruchomiony
            this.setState ({
                running: true  // jeśli stoper był wyłączony to go uruchamiamy
            })
            this.watch = setInterval(() => this.step(), 10); 
            /* Stoper działa w oparciu o interwał,
            który odpala co 10 ms metodę step (która jest po prostu kolejnym tikiem stopera).
            Funkcja setInterval przyjmuje jako pierwszy argument callback, stąd arrow function. */
        }
    }
    /* Metoda step sprawdza, czy nasz timer jest uruchomiony. Jeśli tak, należy metodą calculate przeliczyć odpowiednio
    minuty, sekundy i milisekundy, a następnie wydrukować wynik za pomocą metody print. */
    step() {
        if (!this.state.running) //sprawdzenie czy stoper jest iruchomiony
        return 
            this.calculate(); //jeśli tak to wykorzystujemy metodę calculate
            this.print(); // drukowanie
    }
    /* metoda calculate ma na celu odpowiednie zerowanie wartości milisekund i sekund,
    jeśli te przekroczą pewną wartość i odpowiednie zwiększanie sekund i minut. */
    calculate() {
        this.setState({
            times: {
                minutes: this.state.times.minutes,
                seconds: this.state.times.seconds,
                miliseconds: this.state.times.miliseconds += 1
            }
        })
        if (this.state.times.miliseconds >= 100) {
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds += 1,
                    miliseconds: 0
                }
            })
        }         
        if (this.state.times.seconds >= 60) {
            this.setState({
                times: {
                    minutes: this.state.times.minutes += 1,
                    seconds: 0,
                    miliseconds: this.state.times.miliseconds
                }
            })
        }   
    }

    /* Metoda stop zatrzymuje licznik ustawiając flagę running na false,
    a następnie czyści interwał, który kryje się pod atrybutem watch. */
    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }
    // Metoda resetWatch zeruje licznik po kliknięciu na guzik "Reset Watch".
    resetWatch() {
        this.reset();
        this.print();
    }
    // Metoda addListItem przekazuje wynik do listy czasów
    addListItem() {
        this.state.results.push(this.state.times);
        const list = document.querySelector('.results');
        const listItem = document.createElement('li');
        listItem.innerHTML = this.format(this.times);
        list.appendChild(listItem);
    }
    // Metoda resetList resetuje listę czasów
    resetList() {
        this.setState({
            results: []
            })
        document.querySelector('.results').innerHTML = '';
    }

    render() {
        return (
            <div>
                <nav className="controls">
                    <a href="#" className="button" onClick={this.start.bind(this)}>Start</a>
                    <a href="#" className="button" onClick={this.stop.bind(this)}>Stop</a>
                    <a href="#" className="button" onClick={this.resetWatch.bind(this)}>Reset watch</a>
                    <a href="#" className="button" onClick={this.addListItem.bind(this)}>Add to list</a>
                    <a href="#" className="button" onClick={this.resetList.bind(this)}>Reset time list</a>   
                </nav>
                <div className="stopwatch">{this.state.display}</div>
                <ul className="results">{this.state.results}</ul>
            </div>  
        );
    }   
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);






