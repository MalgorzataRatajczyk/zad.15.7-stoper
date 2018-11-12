"use strict";

// klasa Stopwatch

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props)); //konstruktor


        _this.state = {
            running: false, //wartość początkowa stopera - stoper nie pracuje
            display: '',
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        };
        return _this;
    }

    //implementacja metod, które będą wykonywane po kliknięciu w odpowiedni przycisk
    // metoda reset - zeruje stoper


    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }

        // metoda print ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display

    }, {
        key: 'print',
        value: function print() {
            this.setState({
                display: this.format(this.state.times)
            });
        }

        /* metoda format zajmuje się przygotowaniem tekstu do wyświetlenia. Metoda ta zwraca szablon,
        który wykorzystuje obiekt (times) podany do metody. Korzystamy w tym miejscu z konstrukcji ${nazwa_zmiennej},
        która umożliwia nam przekazanie wyniku kolejnej funkcji (pad0) jako jeden z elementu szablonu. */

    }, {
        key: 'format',
        value: function format(times) {
            return this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
        /* Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych. Funkcja ta przyjmuje na wejście wartość liczbową,
        przekształca ją na stringa, a następnie sprawdza czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym
        zero przed tę liczbę. */

    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                //sprawdzenie czy stoper nie jest uruchomiony
                this.setState({
                    running: true // jeśli stoper był wyłączony to go uruchamiamy
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
                /* Stoper działa w oparciu o interwał,
                który odpala co 10 ms metodę step (która jest po prostu kolejnym tikiem stopera).
                Funkcja setInterval przyjmuje jako pierwszy argument callback, stąd arrow function. */
            }
        }
        /* Metoda step sprawdza, czy nasz timer jest uruchomiony. Jeśli tak, należy metodą calculate przeliczyć odpowiednio
        minuty, sekundy i milisekundy, a następnie wydrukować wynik za pomocą metody print. */

    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) //sprawdzenie czy stoper jest iruchomiony
                return;
            this.calculate(); //jeśli tak to wykorzystujemy metodę calculate
            this.print(); // drukowanie
        }
        /* metoda calculate ma na celu odpowiednie zerowanie wartości milisekund i sekund,
        jeśli te przekroczą pewną wartość i odpowiednie zwiększanie sekund i minut. */

    }, {
        key: 'calculate',
        value: function calculate() {
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds,
                    miliseconds: this.state.times.miliseconds += 1
                }
            });
            if (this.state.times.miliseconds >= 100) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes,
                        seconds: this.state.times.seconds += 1,
                        miliseconds: 0
                    }
                });
            }
            if (this.state.times.seconds >= 60) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes += 1,
                        seconds: 0,
                        miliseconds: this.state.times.miliseconds
                    }
                });
            }
        }

        /* Metoda stop zatrzymuje licznik ustawiając flagę running na false,
        a następnie czyści interwał, który kryje się pod atrybutem watch. */

    }, {
        key: 'stop',
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
        // Metoda resetWatch zeruje licznik po kliknięciu na guzik "Reset Watch".

    }, {
        key: 'resetWatch',
        value: function resetWatch() {
            this.reset();
            this.print();
        }
        // Metoda addListItem przekazuje wynik do listy czasów

    }, {
        key: 'addListItem',
        value: function addListItem() {
            this.state.results.push(this.state.times);
            var list = document.querySelector('.results');
            var listItem = document.createElement('li');
            listItem.innerHTML = this.format(this.times);
            list.appendChild(listItem);
        }
        // Metoda resetList resetuje listę czasów

    }, {
        key: 'resetList',
        value: function resetList() {
            this.setState({
                results: []
            });
            document.querySelector('.results').innerHTML = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.start.bind(this) },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.stop.bind(this) },
                        'Stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.resetWatch.bind(this) },
                        'Reset watch'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.addListItem.bind(this) },
                        'Add to list'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', onClick: this.resetList.bind(this) },
                        'Reset time list'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    this.state.display
                ),
                React.createElement(
                    'ul',
                    { className: 'results' },
                    this.state.results
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
