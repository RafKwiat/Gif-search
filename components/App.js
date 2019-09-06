var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';



App = React.createClass ({
    
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    
    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        
        this.getGif(searchingText)
            .then(
                (response) => {
                let data = JSON.parse(response).data;
                let gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
            
            this.setState ({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        })
    },
    

    
    getGif: function(searchingText) {
        return new Promise(function(resolve, reject) {
            
            const url = `${GIPHY_API_URL}/v1/gifs/random?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`;
            const request = new XMLHttpRequest();
            

            request.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                    
                } else {
                    reject(new Error(this.statusText));
                }
            };
            
            request.onerror = function() {
                reject(new Error(`Something went wrong, dude :( ${this.statusText}`));
            };
            
            request.open('GET', url);
            
            request.send();
        });
    },
        
    
    render: function() {
        
        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź GIFa na <a href='http://giphy.com'>Giphy </a>. Naciskaj ENTER, aby pobrać kolejne GIFy.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});