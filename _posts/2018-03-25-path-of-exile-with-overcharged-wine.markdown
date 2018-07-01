---
layout: post
title: Path Of Exile with an overcharged Wine
author: kevin
hashtags: wine linux poe playonlinux
category: videogames
---

It is a proven fact that if you want to play video games, you must in almost all cases go through Windows. And even if great advances have been made in recent years, especially with the arrival of Steam to push publishers to create on other platforms, our [dear Linux remains quite a bit backwards](http://store.steampowered.com/hwsurvey).

<!--break-->

I had already talked about several native Linux games like [Beholder](https://www.ilphrin.com/fr/planet/2017/07/14/beholder-1984-en-jeu-video-sous-linux.html) or [SteamWorld:Heist](https://www.ilphrin.com/fr/planet/2017/05/29/steamworld-heist-humble-bundle.html) (which are real pearls by the way), or even more "modest" games like [Dungeon Crawl Stone Soup](https://www.ilphrin.com/fr/2013/10/25/dungeon-craw-stone-soup-la-perle-a-avoir.html) and [Caph](https://www.ilphrin.com/fr/2012/10/08/un-jeu-de-dessin-base-sur-les-lois-de-la-physiques.html). Not so long ago you could count games under Linux with the fingers of your hand (counting in decimal base, I might add).

But the vast majority of games are still confined to Windows, for reasons that sometimes escape me, especially when you see that most game creation software like Unity or Unreal Engine support Linux very well.

So, to overcome this problem there is Wine! Meaning "Wine Is Not an Emulator" by the way. Why isn't it an emulator? Because it does a lot better than emulating.

Wine is an abstraction layer of Windows calls, and converts them in real time into calls to Linux libraries and functions. For example in a DirectX game, each call to a function in this library will be translated into a corresponding OpenGL call by Wine. This method has the merit of being much more efficient, and less heavy for the machine than having to emulate an entire OS.

It's been 4 years now that I haven't touched a Windows system despite my very strong player side, and that I owe to Wine! (And PlayOnLinux I don't forget! ;))

## Path Of Exile

Path Of Exile is an Action-RPG game, or a Hack'n'Slash according to the definition you may have, in a Dark Fantasy universe, all in Free To Play (really). It is a game that took a long time to be developed and suffered for a long time from its technological debt. It is, for example, only recently that DirectX version 11 is supported!

My use of this game is quite intensive, I usually go quite far in the game and I often play with other players which multiplies the number of effects to display on screen. Nevertheless, I always had 2 huge problems with this game, even with my new computer from System 76:

* DirectX 11 has never worked with Wine, despite the support announced since several versions
* The game suffers from big slowdowns and falling peaks in the number of frames per second.

Because of this, I greatly reduced my playing frequency. But news from the Wine world has allowed me to look into it, and all these problems are in the past, and I'll explain how I did that.

## Patched Wine-staging

I am the Wine maintainer of Path Of Exile. This means that I am in charge of moderating the tests sent to the Wine site by users, and tracking and updating links to known bugs related to Path Of Exile.

The [DirectX 11 incompatibility bug is known](https://bugs.winehq.org/show_bug.cgi?id=42695), and many people have already complained (me first!). And [a comment](https://bugs.winehq.org/show_bug.cgi?id=42695#c15) on the bug discussion proposed a solution that seemed to work.

The solution was to modify two small lines of code in a precise version of Wine, and the trick was done! So you have to get the Wine code (the Git version, configured with wine-3.3 is fine) and apply these changes before compiling it. (Attention, this is only for Path Of Exile!)

If you follow these steps as you read, I advise you __not to do this right away__! If you've followed, there's another problem I'm going to talk about, and it's going to have to be dealt with first: slowdowns and performance losses.

## Wine-PBA

Just recently came out [an article from a certain _acomminos_](https://comminos.com/posts/2018-02-21-wined3d-profiling.html) talking about a performance problem he had spotted in the translation from DirectX to OpenGL from Wine. In his article he explains the approach he had to diagnose the problem, and propose a solution he called wine-pba.

I won't go into details, [Andrew](https://github.com/acomminos) explains it much better than I, go see his article, but to apply the patches you need a precise version of Wine: the 3.3-staging.

_Staging_ is the name given to a set of patches applied to a version of Wine. 3.3-staging means: "Staging version 3.3 of Wine 3.3".

So you need to get the Wine 3.3 source, apply the associated _staging_ patches, and then apply the wine-pba patches. Once all this is done you can compile Wine by following the documentation on the site, and launch the game with your new wine compiled!

## Results

So here are the graphics (natively integrated to PathOfExile) between a normal version of wine 3.4, and version 3.3 staging with wine-pba.


![Path Of Exile before patches](/images/wine_01.jpg){:.img}_Before Patches_

![Path of Exile after patches](/images/wine_02.jpg){:.img}_After Patches_

Even if the difference does not seem vertiginous, what really makes the difference is the difference of movement of these bars. We see for example the peak in the frame "Frame Time" at 200ms, and this is something that happens frequently when we have a lot of things to load at once. These peaks disappear after the changes.

There are also changes in the number of FPS. They are more or less similar, but in the second situation we have something much more stable, which no longer juggles between the 5 FPS and the 200.

I can only invite you to test with different applications and see for yourself if these changes bring you anything. Wine-PBA is a work in progress, and very recent, and several modifications are still planned by the developer to refine the tool. No doubt this will be an interesting brick to add to the Wine ecosystem!
