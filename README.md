# ATEM-Animation-Generator
An amazing ATEM DVE Animation Generator for creating "macro-based" animations for Blackmagic Design ATEM video switchers.

[Check out the demo](https://zmip.github.io).

![preview of the animation editor](https://forum.blackmagicdesign.com/download/file.php?id=50357)

## What is it?

It's a two-keyframe animation tool for ATEM series switchers. It animates (DVE) keyers or Supersource boxes. The animations themselves run on the switcher through macro's that the tool exports.

I created this in 10 days. It took that much time because I set myself a few interesting challenges:

*  Should have no dependencies or third party code, so it's entirely frameworkless
* Should not rely on external content (on other words: makes no HTTP calls, ever, in other words, runs perfectly on a local machine disconnected from the interwebs)
* Should come in one self-contained HTML file with inline CSS and JavaScript

Requirements: only a modern web browser (Safari, Chrome, Firefox, Edge).

People will probably comment that tools like this exist. I have only found a British guy that runs easing animations through the ATEM API through an Arduino (ouch!), and I looked a few seconds at a YouTube video from someone who animated Supersource boxes. But those were linear animations, so I stopped watching after three seconds. Linear animations are in the ATEM, they hurt my eyes. Besides, using something that already exists, where's the fun in that?  ;)

## How it works

Choose your ATEM switcher:

![device chooser](https://forum.blackmagicdesign.com/download/file.php?id=50359)

Every "device" and "animate" combo has its own set of animation presets.

![presets](https://forum.blackmagicdesign.com/download/file.php?id=50360)

You can create your own presets, delete the defaults, etc. Keep in mind that loading a preset (shortcut: doubleclick its name in the list) will overwrite what you currently have on stage. The default presets were created for 30fps, so they run too fast for 60fps, but you could double the number of frames in the animation properties.

![animation properties](https://forum.blackmagicdesign.com/download/file.php?id=50361)

"Animation properties" is a mini-spreadsheet where the values of the seven properties that can be animated are listed, in their "from" and "to" keyframes. In addition, there's the option to define the number of frames in which this has to happen, and a delay (in frames).
When you click in a cell in the "from" or "to" column, and there is a deviation in their values, the curve-editor will become active:

![curve editor](https://forum.blackmagicdesign.com/download/file.php?id=50362)

It's just a cubic Bezier curve with two handles, which is quite limiting in terms of complex animations. I've created a far more advanced curve editor for a different project in the past (written in Cocoa, for macOS), and that might have been nice here too. But then I thought: "it's just some boxes that need to move on screen", and I stuck with this. If you're in dire need for more complex animation, then let me know and I'll look into adding a more advanced curve editor.

![download options](https://forum.blackmagicdesign.com/download/file.php?id=50363)

And then, when you're happy with the animation you've created, it's time to download it as an ATEM macro file. Just type in a name and an index (it's 1-based, so index 1 is the first macro on the macro pane in ATEM Software control or the "1" macro button on the Extreme). Your web browser will probably bark at you because of security concerns downloading an XML file, but you can train it to keep quiet.

In general, it takes me less than 4 seconds to download an animation from the editor and have it uploaded ("restored") to one of our ATEMs through ATEM Software Control.

So yeah, this is my take on how DVE keyframe animations on these switchers should look like. Keyframe animation should *definitely* not work like the "A/B keyframe" on the machines themselves. Although I'm well aware that that option has a great advantage over macro-driven animations: the values get calculated in real time, so you can change the animation while it's running halfway and things will still end well.

As I've written earlier, I'm impressed with what the ATEM Mini's can do, hardware-wise, but in my opinion there's a lot of room for improvement in the software (either ATEM Software Control or in the machines themselves).

## Supported devices

* ATEM Mini

* ATEM Mini Pro

* ATEM Mini Pro ISO

* ATEM Mini Extreme

* ATEM Mini Extreme ISO

* ATEM Television Studio

* ATEM 1 M/E Production Switcher

* ATEM 2 M/E Production Switcher

* ATEM Production Studio 4K

* ATEM 1 M/E Production Studio 4K

* ATEM 2 M/E Production Studio 4K

* ATEM 2 M/E Broadcast Studio 4K

* ATEM 4 M/E Broadcast Studio 4K

* ATEM Television Studio HD

* ATEM Television Studio Pro HD

* ATEM Television Studio Pro 4K

* ATEM Television Studio 4k8 -    **New!**

* ATEM Television Studio HD8 -    **New!**

* ATEM Televison Studio HD8ISO -   **New!**

* ATEM Constellation 8K 

## Development information

A minimal PHP-based build environment is included in the project. It basically allows you to run it on a local webserver in two modes: in **debug** mode, the CSS and JS files are linked into the HTML GUI file (faster). In **build** mode, the minimized CSS and JS files are injected into the HTML GUI file (slower) to produce a single portable distributable HTML file that runs the entire application. Check the /build directory to see what's expected there. Use your favorite job runner to minimize the CSS and JS files after they've been edited.

Use this project to your advantage, clone, improve and share with the community!
