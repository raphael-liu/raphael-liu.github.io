+++
author = ""
comments = true
date = "2015-12-03T14:07:24+08:00"
draft = false
image = ""
menu = ""
share = true
slug = "post-title"
tags = ["tag1", "tag2"]
title = "welcome"

+++

...
$ hugo help

Hugo is a Fast and Flexible Static Site Generator built with love by spf13 and friends in Go.

Complete documentation is available at http://gohugo.io

Usage:
  hugo [flags]
  hugo [command]

Available Commands:
  server          Hugo runs its own webserver to render the files
  version         Print the version number of Hugo
  config          Print the site configuration
  check           Check content in the source directory
  benchmark       Benchmark hugo by building a site a number of times
  new             Create new content for your site
  undraft         Undraft changes the content's draft status from 'True' to 'False'
  genautocomplete Generate shell autocompletion script for Hugo
  gendoc          Generate Markdown documentation for the Hugo CLI.
  help            Help about any command

Flags:
  -b, --baseURL="": hostname (and path) to the root, e.g. http://spf13.com/
  -D, --buildDrafts=false: include content marked as draft
  -F, --buildFuture=false: include content with publishdate in the future
      --cacheDir="": filesystem path to cache directory. Defaults: $TMPDIR/hugo_cache/
      --config="": config file (default is path/config.yaml|json|toml)
  -d, --destination="": filesystem path to write files to
      --disableRSS=false: Do not build RSS files
      --disableSitemap=false: Do not build Sitemap file
      --editor="": edit new content with this editor, if provided
  -h, --help=false: help for hugo
      --ignoreCache=false: Ignores the cache directory for reading but still writes to it
      --log=false: Enable Logging
      --logFile="": Log File path (if set, logging enabled automatically)
      --noTimes=false: Don't sync modification time of files
      --pluralizeListTitles=true: Pluralize titles in lists using inflect
  -s, --source="": filesystem path to read files relative from
      --stepAnalysis=false: display memory and timing of different steps of the program
  -t, --theme="": theme to use (located in /themes/THEMENAME/)
      --uglyURLs=false: if true, use /filename.html instead of /filename/
  -v, --verbose=false: verbose output
      --verboseLog=false: verbose logging
  -w, --watch=false: watch filesystem for changes and recreate as needed


Additional help topics:
 hugo convert         Convert will modify your content to different formats hugo list            Listing out various types of content

Use "hugo help [command]" for more information about a command.
...