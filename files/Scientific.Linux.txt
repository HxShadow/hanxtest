sudo rm -f /var/run/yum.pid
#vim
sudo yum install vim-* -y

#sudo rpm -e vim-X11-7.4.160-5.el7.x86_64 vim-enhanced-7.4.160-5.el7.x86_64 vim-filesystem-7.4.160-5.el7.x86_64 vim-minimal-7.4.160-5.el7.x86_64 vim-common-7.4.160-5.el7.x86_64 --nodeps
rpm -qa|grep vim
sudo rpm -e --nodeps `rpm -qa|grep vim`
sudo rpm -Uvh http://mirror.ghettoforge.org/distributions/gf/gf-release-latest.gf.el7.noarch.rpm
sudo rpm --import http://mirror.ghettoforge.org/distributions/gf/RPM-GPG-KEY-gf.el7
sudo yum -y --enablerepo=gf-plus install vim-enhanced vim-X11 vim-minimal vim-common vim-filesystem


#ssh no-password
ssh-keygen -t rsa
scp -P 2000 $HOME/.ssh/id_rsa.pub hanx@hep.buaa.edu.cn:.
ssh hanx@hep.buaa.edu.cn -p 2000 "cat id_rsa.pub >> /home/hanx/.ssh/authorized_keys;rm -f id_rsa.pub"
scp -P 2000 hanx@hep.buaa.edu.cn:.ssh/id_rsa.pub $HOME;cat $HOME/id_rsa.pub >> $HOME/.ssh/authorized_keys;chmod 600 $HOME/.ssh/authorized_keys

#Change repo & upgrade
mkdir $HOME/yum.bk;sudo mv /etc/yum.repos.d/* $HOME/yum.bk/
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/repo.tar $HOME
tar -xvf repo.tar;cd repo;sudo mv * /etc/yum.repos.d/
cd /etc/pki/rpm-gpg
sudo wget https://archive.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-7
sudo yum install yum-axelget 
sudo yum clean all && sudo yum makecache && sudo yum -y update
sudo yum upgrade
sudo yum update 

# Chrome
sudo yum install google-chrome-beta.x86_64 -y

# Thumbnail
sudo yum -y install ffmpegthumbnailer

# ntfs-3g
sudo yum -y install epel-release ntfs-3g ntfsprogs
grub2-mkconfig -o /boot/grub2/grub.cfg
# add 'sudo ntfs-3g /dev/sdb3 /data' in to /etc/rc.d/rc.local
# windows 
sudo grub2-mkconfig -o /boot/grub2/grub.cfg  
init 6
# if the Windows disk was readonly, then
# sudo yum -y install ntfs*
# ntfsfix /dev/sdb1

# LaTeX
sudo yum install perl-Digest-MD5 -y
sudo yum remove texlive-* -y
cd;scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/LaTeX/texlive2018.iso .
sudo mount texlive2018.iso /mnt;cd /mnt
sudo yum install perl-Tk -y
sudo ./install-tl -gui
sudo umount /mnt/

# ROOT
# https://root.cern.ch/build-prerequisites
sudo yum install git cmake gcc-c++ gcc binutils libX11-devel libXpm-devel libXft-devel libXext-devel -y
sudo yum install gcc-gfortran openssl-devel pcre-devel mesa-libGL-devel mesa-libGLU-devel glew-devel ftgl-devel mysql-devel fftw-devel cfitsio-devel graphviz-devel avahi-compat-libdns_sd-devel libldap-dev python-devel libxml2-devel gsl-static -y
sudo yum install cmake3.x86_64 -y
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/root/root_v6.16.00.source.tar.gz .
tar -xvf root_v6.16.00.source.tar.gz
mkdir $HOME/root  && cd $HOME/root  
cmake3 ../root-*  
make -j4
sudo mv root /var/local/
echo -e "# Root \nsource /var/local/root/bin/thisroot.sh" >> $HOME/.bashrc

#JAVA
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/java/jdk-10.0.1_linux-x64_bin.tar.gz .
tar -xvf jdk-12_linux-x64_bin.tar.gz
sudo mv jdk-12 /var/local
echo "#set Java environment
export JAVA_HOME=/var/local/jdk-12/
export JRE_HOME=\${JAVA_HOME}/jre
export CLASSPATH=.:\${JAVA_HOME}/lib:\${JRE_HOME}/lib
export PATH=\${JAVA_HOME}/bin:\$PATH" >> $HOME/.bashrc

#xsel(copy to clipboard)
sudo yum install xsel.x86_64 -y

#download
sudo yum install transmission

#fonts
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/fonts.tar.bz2 .
tar -jxvf fonts.tar.bz2
sudo mv fonts /usr/share/fonts/winfonts
cd /usr/share/fonts/winfonts
sudo mkfontscale
sudo mkfontdir
sudo fc-cache -fv
cd;rm fonts.tar.bz2

# Mathematica
cd;scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/Mathematica/Mathematica.v11.2.0.Linux/Setup/Mathematica_11.3.0_LINUX.sh .
chmod +x Mathematica_11.3.0_LINUX.sh
sudo ./Mathematica_11.3.0_LINUX.sh

# Adobe Reader
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/AdbeRdr9.5.5-1_i486linux_enu.rpm .
sudo yum localinstall http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm -y
sudo yum localinstall AdbeRdr9.5.5-1_i486linux_enu.rpm libcanberra-gtk2.i686 adwaita-gtk2-theme.i686 PackageKit-gtk3-module.i686

# Skype for Linux
#wget --trust-server-names https://go.skype.com/skypeforlinux-64.rpm
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/skypeforlinux-64.rpm .;sudo yum localinstall skypeforlinux-64.rpm -y;rm skypeforlinux-64.rpm

# VirtualBox
sudo rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install VirtualBox-5.2 -y

# XX-Net
https://www.remlab.net/files/miredo/?C=N;O=D
#before import CA, should install libnss-mysql
sudo yum install libnss-mysql.x86_64 -y
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/miredo-1.2.6.tar.xz .
xz -d miredo-1.2.6.tar.xz;tar -xvf miredo-1.2.6.tar
cd miredo-1.2.6;./configure
make
su
make install
http://git.remlab.net/gitweb/?p=miredo.git;a=blob_plain;f=README;hb=HEAD

# WPS
sudo yum install libpng12
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/wps/wps_symbol_fonts.tar.gz .
tar -zxvf wps_symbol_fonts.tar.gz
sudo mv wps_symbol_fonts /usr/share/fonts/
cd /usr/share/fonts/wps_symbol_fonts
sudo mkfontscale
sudo mkfontdir
sudo fc-cache -fv
cd;scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/wps/wps-office-11.1.0.8372-1.x86_64.rpm .
sudo rpm -ivh wps-office-11.1.0.8372-1.x86_64.rpm
cd;scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/glibc-2.18.tar.gz .
tar -zxvf glibc-2.18.tar.gz
cd glibc-2.18
mkdir build
cd build
../configure --prefix=/usr
make -j4
sudo make install

#export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/glibc-2.18/lib


# nivda

# vpn
# 1. OpenConnect, a alternatives software for AnyConnect
sudo yum install -y openconnect NetworkManager-openconnect NetworkManager-openconnect-gnome
# 2. AnyConnect, KEK vpn environments 
#http://ccwww.kek.jp/ccsupport/network/vpn/index.html
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/anyconnect-linux64-4.5.02033-predeploy-k9.tar.gz .
sudo yum install -y pangox-compat
tar -xf anyconnect*
rm -v anyconnect*k9.tar.gz
cd anyconnect*/vpn
sudo ./vpn_install.sh
/opt/cisco/anyconnect/bin/vpnui
/opt/cisco/anyconnect/bin/vpn
# 3. OpenVPN, a sample vpn which can setup on personal pc 
sudo yum -y install NetworkManager-openvpn NetworkManager-openvpn-gnome

# vlc
#https://www.videolan.org/vlc/download-redhat.html
sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-7.noarch.rpm
sudo yum install vlc
#sudo yum install vlc-core (for minimal headless/server install)
#sudo yum install python-vlc npapi-vlc (optionals)

# SoX
sudo yum install sox soxr sox-plugins-freeworld -y
#Package soxr-0.1.2-1.el7.x86_64 already installed and latest version
#Package sox-14.4.1-6.el7.x86_64 already installed and latest version
#Package sox-plugins-freeworld-14.4.1-3.el7.nux.x86_64 already installed and latest version

#vim old
#yum remove libstdc++.i686
sudo yum install ncurses-devel.x86_64  -y
sudo yum install libstdc++-static.x86_64 -y
sudo yum install libstdc++-docs.x86_64 -y
sudo curl -L https://copr.fedorainfracloud.org/coprs/mcepl/vim8/repo/epel-7/mcepl-vim8-epel-7.repo -o /etc/yum.repos.d/mcepl-vim8-epel-7.repo
sudo yum update 
sudo yum install vim-X11.x86_64 vim-enhanced.x86_64 

#vim new make (doesn't work)
#rpm -qa|grep vim
sudo rpm -e vim-X11-7.4.160-5.el7.x86_64 vim-enhanced-7.4.160-5.el7.x86_64 vim-filesystem-7.4.160-5.el7.x86_64 vim-minimal-7.4.160-5.el7.x86_64 vim-common-7.4.160-5.el7.x86_64 --nodeps
sudo yum install -y ruby ruby-devel lua lua-devel luajit luajit-devel ctags tcl-devel perl perl-devel perl-ExtUtils-ParseXS perl-ExtUtils-XSpp perl-ExtUtils-CBuilder perl-ExtUtils-Embed ncurses-devel
./configure --with-features=huge --enable-multibyte --enable-rubyinterp --enable-pythoninterp --with-python-config-dir=/usr/lib64/python2.7/config/ --enable-python3interp --with-python3-config-dir=/usr/lib64/python3.6/config-3.6m-x86_64-linux-gnu/ --enable-perlinterp --enable-luainterp --enable-gui=gtk2 --enable-cscope --prefix=/usr
make VIMRUNTIMEDIR=/usr/local/share/vim/vim81

#workspace
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>1']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-2 "['<Super>2']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-3 "['<Super>3']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-4 "['<Super>4']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-5 "['<Super>5']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-6 "['<Super>6']"

#shadowsocks
sudo wget "https://copr.fedorainfracloud.org/coprs/librehat/shadowsocks/repo/epel-7/librehat-shadowsocks-epel-7.repo"
sudo yum update 
sudo yum install shadowsocks-qt5

# ImageMagick
sudo yum install gcc php-devel php-pear
sudo yum install libde265
sudo yum -y install bzip2-devel freetype-devel libjpeg-devel libpng-devel libtiff-devel giflib-devel zlib-devel ghostscript-devel djvulibre-devel libwmf-devel jasper-devel libtool-ltdl-devel libX11-devel libXext-devel libXt-devel lcms-devel libxml2-devel librsvg2-devel OpenEXR-devel php-devel LibRaw LibRaw-devel libheif libheif-devel
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/ImageMagick.tar.gz $HOME
cd;tar -xf ImageMagick.tar.gz
cd ImageMagick-7*
./configure
make -j4
sudo make install

# evolution
sudo yum install evolution-ews
scp -P 2000 hep.buaa.edu.cn:share/install/software/evolution-backup-20190419.tar.gz $HOME

# nautilus
vim ~/.local/share/nautilus/scripts/Terminal
# !/bin/sh
gnome-terminal

chmod +x ~/.local/share/nautilus/scripts/Terminal
nautilus -q

vim ~/.config/nautilus/scripts-accels
F4 Terminal
; Commented lines must have a space after the semicolon
; Examples of other key combinations:
; <Control>F12 Terminal
; <Alt>F12 Terminal
; <Shift>F12 Terminal

# ibus-libpinyin?
git clone https://github.com/libpinyin/ibus-libpinyin.git
sudo yum install gnome-common ibus-devel sqlite-devel libpinyin-devel gettext-devel intltool libtool pkgconfig libuuid-devel opencc-devel lua-devel 
cd #blabla
./autogen.sh

# psacct
#https://www.wenzizone.cn/2009/12/04/使用psacct监控linux用户行为技术.html
