
class Application {


    public start = ():void => {
        const follow_btns = document.getElementsByClassName('follow-btn')
        Array.from(follow_btns).forEach((element:Element) => {
            element.addEventListener('click', this.triggerAlert)
        })
    }

    public triggerAlert = (e: Event): void => {
        const element = e.currentTarget as HTMLElement
        if (element.classList.contains('nofollow')) {
            element.className = 'follow-btn following'
            element.innerHTML = 'フォローを解除する'
        } else if (element.classList.contains('following')) {
            element.className = 'follow-btn nofollow'
            element.innerHTML = 'フォローする'
        }
    }

}

const app = new Application()
app.start()