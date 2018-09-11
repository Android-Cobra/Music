import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicsProvider } from '../../providers/musics/musics';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicPlayerPage} from '../music-player/music-player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic =[];
  constructor(public navCtrl: NavController,
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private musicProvider: MusicsProvider) {
    // this.musicProvider.getMusic()
    // .subscribe(musicList => console.log(musicList)); 
  }

  ionViewDidLoad() {
    console.log("View Loaded");
    let allMusicLoadingController = this.loadingController.create({
      content:"Loading..."
    });
    allMusicLoadingController.present();

    this.musicProvider.getMusic()
    .subscribe((musicList)=>{
      allMusicLoadingController.dismiss();
      this.allMusic = musicList
      //this.allMusic = this.objectToArray(musicList);
    }); 
  }

  shareSong(music) {
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share song",
      buttons:[
        {
          text:"Share on Facebook",
          icon:"logo-facebook",
          handler:()=>{
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url)
          }
        },

        {
          text: "Twitter",
          icon:"logo-twitter",
          handler:()=>{
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url)
          }
        },
        
        {
          text:"Share",
          icon:"share",
          handler:()=> {
            this.socialSharing.share(music.name,"",music.image, music.image_url);
          }
        },
        {
          text:"Cancel",
          role:"destructive"
        }
      ]
    });

    shareSongActionSheet.present();
  }

  goToMusic(music) {
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    });
  }

  objectToArray(obj) {
    if (typeof(obj) === 'object') {
      var keys = Object.keys(obj);
      var allObjects = keys.every(x => typeof(obj[x]) === 'object');
      if (allObjects) {
        return keys.map(x => this.objectToArray(obj[x]));
      }else {
        var o = {};
        keys.forEach(x => {
          o[x] =  this.objectToArray(obj[x])
        });
        return o;
      }


    }else {
      return obj;
    }
  }

}
