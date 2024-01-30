# DJet Bot

Discord music bot named DJet that allows users to play music in voice channels of servers. It is built by using the [discord.js](https://discord.js.org/#/) and [discord-player](https://discord-player.js.org) libraries.

# Features

**Note**: The requested `song` can either be a search or a link to a youtube video/playlist.

`/play <song>` command will immediately play the requested `song`.

```c
/play <song>

Example: /play a sky full of stars
```

`/queue <song>` command will add the requested `song` to the end of the queue.

```c
/queue <song>

Example: /queue a sky full of stars
```

`/lyrics` or `/lyrics <song>` command will send a message with the lyrics of the current song or requested `song`.

```c
/lyrics

/lyrics <song>

Example: /lyrics a sky full of stars
```

`/viewqueue` command will display the current songs in the queue.

```c
/viewqueue
```

`/remove <number>` command will remove a song from the queue.

```c
/remove <num of song in queue>

Example: /remove 1
```

`/clearqueue` command will clear all songs from the queue.

```c
/clearqueue
```

`/skip` command will skip the song that is currently playing.

```c
/skip
```

`/pause` command will pause the song currently playing.

```c
/pause
```

`/resume` command will resume the song currently paused.

```c
/resume
```

`/restart` command will restart the song that is currently playing.

```c
/restart
```

`/leave` command will disconnect the bot from the voice call it is currently in.

```c
/leave
```

`/previous` command will immediately play the song that was previously in the queue.

```c
/previous
```

`/currentsong` command will send a message with the song currently playing.

```c
/currentsong
```

`/echo <input message>` command will replicate the inputted message.

```c
/echo <input message>

Example: /echo Hello World!
```

`/rm kick <user>` or `/rm ban <user>` command will kick or ban the user.

```c
/rm kick <user>

/rm ban <user>

Example: /rm kick @Jet, /rm ban @Jet
```

