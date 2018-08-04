sudo rm -f /var/run/yum.pid
#vim
sudo yum install vim-* -y

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
sudo yum upgrade
sudo yum update 

# Chrome
sudo yum install google-chrome-beta.x86_64 -y

# ntfs-3g
sudo yum -y install epel-release
sudo yum -y install ntfs-3g
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
cd;scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/LaTeX/texlive2017.iso .
sudo mount texlive2017.iso /mnt;cd /mnt
sudo ./install-tl
sudo umount /mnt/

# ROOT
sudo yum install git cmake gcc-c++ gcc binutils libX11-devel libXpm-devel libXft-devel libXext-devel -y
sudo yum install gcc-gfortran openssl-devel pcre-devel mesa-libGL-devel mesa-libGLU-devel glew-devel ftgl-devel mysql-devel fftw-devel cfitsio-devel graphviz-devel avahi-compat-libdns_sd-devel libldap-dev python-devel libxml2-devel gsl-static -y
sudo yum install cmake3.x86_64 -y
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/root/root_v6.13.02.source.tar.gz .
tar -xvf root_v6.13.02.source.tar.gz
mkdir $HOME/root  && cd $HOME/root  
cmake3 ../root-*  
make -j4
sudo mv root /var/local/
echo -e "# Root \nsource /var/local/root/bin/thisroot.sh" >> $HOME/.bashrc

#JAVA
scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/java/jdk-10.0.1_linux-x64_bin.tar.gz .
tar -xvf jdk-10.0.1_linux-x64_bin.tar.gz
sudo mv jdk-10.0.1 /var/local
echo "#set Java environment
export JAVA_HOME=/var/local/jdk-10.0.1/
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
cd;rm fonts.tar

# Mathematica
cd;scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/Mathematica/Mathematica.v11.2.0.Linux/Setup/Mathematica_11.2.0_LINUX.sh .
chmod +x Mathematica_11.2.0_LINUX.sh
sudo ./Mathematica_11.2.0_LINUX.sh

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
cd;scp -P 2000 hanx@hep.buaa.edu.cn:share/install/software/wps/wps-office-10.1.0.5707-1.a21.x86_64.rpm .
sudo rpm -ivh wps-office-10.1.0.5707-1.a21.x86_64.rpm

# nivda


# ssh


# vpn
sudo yum install openconnect NetworkManager-openconnect -y
#http://ccwww.kek.jp/ccsupport/network/vpn/index.html

# vlc
#https://www.videolan.org/vlc/download-redhat.html
sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-7.noarch.rpm
sudo yum install vlc
#sudo yum install vlc-core (for minimal headless/server install)
#sudo yum install python-vlc npapi-vlc (optionals)

#vim
#yum remove libstdc++.i686
sudo yum install ncurses-devel.x86_64  -y
sudo yum install libstdc++-static.x86_64 -y
sudo yum install libstdc++-docs.x86_64 -y
sudo curl -L https://copr.fedorainfracloud.org/coprs/mcepl/vim8/repo/epel-7/mcepl-vim8-epel-7.repo -o /etc/yum.repos.d/mcepl-vim8-epel-7.repo
sudo yum update 
sudo yum install vim-X11.x86_64 vim-enhanced.x86_64 

#workspace
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>1']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-2 "['<Super>2']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-3 "['<Super>3']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-4 "['<Super>4']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-5 "['<Super>5']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-6 "['<Super>6']"
