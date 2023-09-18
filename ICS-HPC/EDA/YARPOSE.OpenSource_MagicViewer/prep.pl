#!/usr/bin/perl
#

# Set this to 1 under UNIX and 0 under operating systems where
# file names are case insensitive
$FileCase = 0;

$arg = shift;

print "Multi Line Perl Execution Program V2.0\n";
if( $arg eq '-h' ){
  print <<END ;

Execute Perl command for each line of the text files.
The program can recurse subdirectories, select files
matching pattern, do changes, like s#Java#Borneo#g; and
write the result back to the file.

Just start without arguments and answer the questions.

For multiline commands finish all lines but the last
with a \\ character.

Use the option -u to perform undo from undo file.
END
  exit;
  }
print "Use -h for help.\n";

if( $arg eq '-u' ){
  print "Undo file?";$UndoFile = <>; chomp $UndoFile;
  if( ! open(UNDO,"<$UndoFile") ){
    print "Can not open undo file.\n";
    exit;
    }
  $CurrentFile = '';
  @line = ();
  while( 1 ){
    $_ = <UNDO>;
    if( !defined($_) || /File: (.*)/ ){
      $NextFile = $1;
      if( $CurrentFile ){
        if( open(F,">$CurrentFile") ){
          print F @line;
          close F;
          print " done\n";
          }else{
          print "Can not write $CurrentFile.\n";
          }
        }
      if( ! defined($_) ){ last; }
      $CurrentFile = $NextFile;
      if( open(F,"<$CurrentFile") ){
        @line = <F>;
        close F;
        print "Restoring $CurrentFile ...";#no \n
        }else{
        print "Can not open $CurrentFile.\n";
        $CurrentFile = '';
        }
      next;
      }
    if( /(\d+):(.*)$/ ){
      $line[$1-1] = $2;
      }
    }
  close UNDO;
  exit;
  }

if( $arg eq '-c' ){# parameters are given in a command file
  $CommandFile = shift;
  open(F,"<$CommandFile") or die "Can not open command file $CommandFile.";
  $StartDirectory = <F>;chomp $StartDirectory;
  $FilePattern = <F>; chomp $FilePattern;
  $RecurseSubdirectories = <F>; chomp $RecurseSubdirectories;
  $UndoFile = <F>; chomp $UndoFile;
  $VerboseMode = <F>;chomp $VerboseMode;
  while(<F>){
    $Command .= $_;
    if( $Command =~ /\\$/){
      chop;chop;
      $Command .= "\n";
      }else{last}
    }
  close F;
  }else{
  print "Start directory? [.]";$StartDirectory = <>;chomp $StartDirectory;
  print "File pattern:"; $FilePattern = <>; chomp $FilePattern;
  print "Recurse subdirectories? [n]"; $RecurseSubdirectories = <>; chomp $RecurseSubdirectories;
  print "Save undo information to file [none]?"; $UndoFile = <>; chomp $UndoFile;
  print "Verbose mode [y]:";$VerboseMode = <>;chomp $VerboseMode;
  print "Keep original file times? [n]";$KeepTime = <>; chomp $KeepTime;
  $KeepTime = ( $KeepTime eq 'Y' || $KeepTime eq 'y' );
  print "Command to execute for each line:\n"; 
  $Command = '';
  while(<>){
    $Command .= $_;
    if( $Command =~ /\\$/ ){
      chop;chop;
      $Command .= "\n";
      }else{last}
    }
  }

if( $RecurseSubdirectories =~ m#y#i ){
  $RecurseSubdirectories = 1;
  }else{
  $RecurseSubdirectories = 0;
  }

if( $StartDirectory eq '' ){
  $StartDirectory = '.';
  }

if( $VerboseMode =~ m#n#i ){
  $VerboseMode = 0;
  }else{
  $VerboseMode = 1;
  }

$FilePattern =~ s#\.#\\.#g;
$FilePattern =~ s#\*#.*#g;
$FilePattern =~ s#\?#.#g;
$FilePattern = '(?i)' . $FilePattern unless $FileCase ;

if( $UndoFile ){
  if( !open(UNDO,">$UndoFile") ){
    print "I can not open $UndoFile to save undo information.\n";
    exit;
    }
  }

# Create the list of the files
opendir(D,$StartDirectory);
@files = readdir(D);
closedir(D);
@dirs  = grep( (-d "$StartDirectory/$_") && /^[^.]/ ,@files);
@files = grep( /^$FilePattern$/ , @files);
for( @files ){ $_ = "$StartDirectory/$_" }

while( $RecurseSubdirectories && $#dirs > -1 ){
  $cdir = pop @dirs;

  opendir(D,"$StartDirectory/$cdir");
  @f = readdir(D);
  closedir(D);

  @d  = grep( (-d "$StartDirectory/$cdir/$_") && /^[^.]/,@f);
  @f  = grep( $FileCase ? /^$FilePattern$/ : /^$FilePattern$/i , @f);
  for( @d ){
   push @dirs, "$cdir/$_";
   }
  for( @f ){
   push @files, "$StartDirectory/$cdir/$_";
   }
  }

for $file ( @files ){
  $FileNamePrinted = 0;
  if( $VerbodeMode ){
    print "File: $file\n";
    $FileNamePrinted;
    }
  $PrintUndoFileHeader = 1;
  if( ! open(F,"<$file") ){
    print "File: $file\n" unless $FileNamePrinted;
    print "      not readable.\n";
    next;
    }
  @lines = <F>;
  close F;
  $Changed = 0;
  $linr = 0;
  for( @lines ){
    $linr ++;
    $old = $_;
    $result = eval $Command;
    if( $old ne $_ ){
      print "File: $file\n" unless $FileNamePrinted;
      print "Line ($linr):\n$old$_";
      $Changed = 1;
      if( $UndoFile ){
        if( $PrintUndoFileHeader ){
          print UNDO "File: $file\n";
          $PrintUndoFileHeader = 0;
          }
        print UNDO "$linr:$old";
        }
      }
    elsif( $result ){
      print "File: $file\n" unless $FileNamePrinted;
      print "Line ($linr): $_";
      }
    }
  if( $Changed ){
    if( $KeepTime ){
      $mtime = (stat($file))[9]; # my deleted
      }
    if( ! open(F,">$file") ){
      print "File: $file\n" unless $FileNamePrinted;
      print "      not writable.\n";
      next;
      }
    print F @lines;
    close F;
    if( $KeepTime ){
      utime $atime,$mtime,$file;
      }
    print "File: $file changed.\n";
    }
  }

if( $UndoFile ){
  close UNDO;
  }
exit;
__END__