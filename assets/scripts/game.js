let game = {

    teemos : ['Astreemo',
    'Beemo',
    'Bunneemo',
    'Chernobeemo',
    'EvilTeemo',
    'Pandeemo',
    'SuperTeemo',
    'Teemo',
    'Teemobell',
    'Teexugo'],

    cards : null,

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){

        let card = this.cards.filter(card=>card.id===id)[0];
        console.log(card);
        if (card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },
    
    checkMatch : function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;

    },

    clearCards : function() {

        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;

    },

    unflipCards: function() {

        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();

    },

    checkGameOver() {

        return this.cards.filter(card=>!card.flipped).length == 0;

    },

    createCardFromTeemos : function () {

        this.cards = [];

        this.teemos.forEach((teemo) => {
            this.cards.push(this.createPairFromTeemos(teemo));
        })

    this.cards =  this.cards.flatMap(pair=>pair);
    this.shuffleCards();
    return this.cards;

    },

    createPairFromTeemos : function createPairFromTeemos(teemo) {

        return[{
            id: this.createIdWithTeemos(teemo),
            icon: teemo,
            flipped: false,
        }, {
            id: this.createIdWithTeemos(teemo),
            icon: teemo,
            flipped: false,
        }]
    },

    createIdWithTeemos : function createIdWithTeemos(teemo){

        return teemo + parseInt(Math.random() * 1000);

    },

    shuffleCards : function (cards){
    
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
            
        }

    },
}