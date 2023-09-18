/*
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU 
 * General Public License as published by the Free Software Foundation, either version 3 of the License, or 
 * (at your option) any later version so long as the follwoing watermark remains intact.
 * The mentioned watermark is presented here:
 * "M" + 'a' + 'g' + 'i' + 'c' + ' ' + 'V' + 'i' + 'e' + 'w' + 'e' + 'r' + ' ' + 'v' + '1' + '.' + '0' + ' ' + ' ' + ' ' + '\251' + '1' + '9' + '9' + '9' + ' ' + ' ' + ' ' + 'A' + 'a' + 'r' + 'o' + 'n' + ' ' + 'C' + '.' + ' ' + 'S' + 'h' + 'u' + 'm' + 'a' + 't' + 'e'
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program. If not, see 
 * <https://www.gnu.org/licenses/>. 
 * History:  
 * Original code: (C) 1999-2023 Aaron C. Shumate
 * Migrated the original Java class files into platform-independent browsers via CheerpJ: (C) 2023 M. B. Ghaznavi-Ghoushchi
 * 
 */

import java.applet.Applet;
import java.applet.AppletContext;
import java.awt.*;
import java.awt.image.IndexColorModel;
import java.awt.image.MemoryImageSource;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.MalformedURLException;
import java.net.URL;

public class magic extends Applet
{

    public void init()
    {
        setLayout(null);
        width = bounds().width - 2 * offset;
        height = bounds().height - 2 * offset;
        resize(bounds().width, bounds().height);
        image2 = createImage(bounds().width, bounds().height);
        buffer = image2.getGraphics();
        buffer.setColor(new Color(colormap[0]));
        buffer.fillRect(0, 0, bounds().width, bounds().height);
        String st = getDocumentBase().toString();
        System.out.println("HTML File Address: " + st);
        base = st.substring(0, st.lastIndexOf('/') + 1);
        System.out.println("HTML File Directory=" + base);
        String fileRoot = st.substring(st.lastIndexOf('/') + 1, st.length() - 5);
        System.out.println("HTML File Root Name=" + fileRoot);
        System.out.println("RelativeMagicLocation: " + getParameter("RelativeMagicLocation"));
        System.out.println("MagicLocation: " + getParameter("MagicLocation"));
        System.out.println("MagicFile: " + getParameter("MagicFile"));
        String magicBase;
        if(getParameter("MagicLocation") != null)
            magicBase = getParameter("MagicLocation");
        else
        if(getParameter("RelativeMagicLocation") != null)
            magicBase = base + getParameter("RelativeMagicLocation");
        else
            magicBase = base;
        System.out.println("Magic File Directory: " + magicBase);
        String fileName;
        if(getParameter("MagicFile") != null)
            fileName = getParameter("MagicFile");
        else
            fileName = fileRoot + ".mag";
        System.out.println("Magic File Name: " + fileName);
        drawMagic(magicBase + fileName);
    }

    void drawMagic(String magic)
    {
        System.out.println("Magic File Location: " + magic);
        if(openFile(magic))
        {
            System.out.println("Magic file could not be opened.");
            return;
        }
        if(data[0] != 'm' || data[1] != 'a' || data[2] != 'g' || data[3] != 'i' || data[4] != 'c')
        {
            System.out.println("File is not a magic file.");
            return;
        } else
        {
            rePaint1();
            double x = (double)width / (maxX - minX);
            double y = (double)height / (maxY - minY);
            mag = x >= y ? y : x;
            pix = new byte[(int)(mag * ((maxX - minX) + 1.0D) * mag * ((maxY - minY) + 1.0D)) + 1000];
            urls = new String[urlCount];
            urlX1 = new int[urlCount];
            urlX2 = new int[urlCount];
            urlY1 = new int[urlCount];
            urlY2 = new int[urlCount];
            urlCount = -1;
            rePaint2();
            MemoryImageSource memory = new MemoryImageSource((int)(mag * (maxX - minX)), (int)(mag * (maxY - minY)), colorModel, pix, 0, (int)(mag * (maxX - minX)));
            image1 = createImage(memory);
            buffer.drawImage(image1, offset, offset, (int)(mag * (maxX - minX)), (int)(mag * (maxY - minY)), this);
            rePaint3(buffer);
            buffer.setColor(Color.black);
            buffer.setFont(new Font("Times", 0, 11));
            buffer.drawString("M" + 'a' + 'g' + 'i' + 'c' + ' ' + 'V' + 'i' + 'e' + 'w' + 'e' + 'r' + ' ' + 'v' + '1' + '.' + '0' + ' ' + ' ' + ' ' + '\251' + '1' + '9' + '9' + '9' + ' ' + ' ' + ' ' + 'A' + 'a' + 'r' + 'o' + 'n' + ' ' + 'C' + '.' + ' ' + 'S' + 'h' + 'u' + 'm' + 'a' + 't' + 'e', 10, bounds().height - 10);
            return;
        }
    }

    public void paint(Graphics g)
    {
        g.drawImage(image2, 0, 0, this);
        System.out.println("Done");
    }

    void rePaint1()
    {
        int i;
        for(i = 0; data[i] != '\n'; i++);
        for(i++; data[i] != '\n'; i++);
        for(i++; data[i] != '\n'; i++);
        i++;
        boolean cont = true;
        while(data[i] == '<') 
        {
            int begin = i += 3;
            for(; data[i] != ' '; i++);
            String string = new String(data, begin, i - begin);
            if(string.compareTo("labels") == 0 || string.compareTo("end") == 0)
                break;
            for(i += 4; data[i] == 'r';)
            {
                i += 5;
                boolean sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double a = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    a *= 10D;
                    a += data[i] - 48;
                }

                if(sign)
                    a = -a;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double b = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    b *= 10D;
                    b += data[i] - 48;
                }

                if(sign)
                    b = -b;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double c = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    c *= 10D;
                    c += data[i] - 48;
                }

                if(sign)
                    c = -c;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double d = data[i] - 48;
                for(i++; data[i] != '\n'; i++)
                {
                    d *= 10D;
                    d += data[i] - 48;
                }

                if(sign)
                    d = -d;
                i++;
                setMax(a, b, c, d);
            }

        }
        while(data[i] == 'u') 
        {
            int start = i + 4;
            for(i = start; data[i] != ' '; i++);
            String part = new String(data, start, i - start);
            for(; data[i] != '\n'; i++);
            int array[] = new int[6];
            if(data[i + 1] == 'a')
            {
                i = parseNumbers(6, i + 7, array);
            } else
            {
                array[0] = 0;
                array[1] = 0;
                array[2] = 0;
                array[3] = 0;
                array[4] = 0;
                array[5] = 0;
                i++;
            }
            for(; data[i] != '\n'; i++);
            int transform[] = new int[6];
            i = parseNumbers(6, i + 11, transform);
            int box[] = new int[4];
            i = parseNumbers(4, i + 4, box);
            double a = 0.0D;
            double b = 0.0D;
            double c = 0.0D;
            double d = 0.0D;
            if(transform[0] == 0 && transform[4] == 0)
            {
                if(transform[1] == 1 && transform[3] == 1)
                {
                    a = transform[2] + box[1];
                    c = transform[2] + box[3];
                    b = transform[5] + box[0];
                    d = transform[5] + box[2];
                } else
                if(transform[1] == 1 && transform[3] == -1)
                {
                    a = transform[2] + box[1];
                    c = transform[2] + box[3];
                    b = transform[5] - box[2];
                    d = transform[5] - box[0];
                } else
                if(transform[1] == -1 && transform[3] == 1)
                {
                    a = transform[2] - box[3];
                    c = transform[2] - box[1];
                    b = transform[5] + box[0];
                    d = transform[5] + box[2];
                } else
                if(transform[1] == -1 && transform[3] == -1)
                {
                    a = transform[2] - box[3];
                    c = transform[2] - box[1];
                    b = transform[5] - box[2];
                    d = transform[5] - box[0];
                }
            } else
            if(transform[0] == 1 && transform[4] == 1)
            {
                a = transform[2] + box[0];
                c = transform[2] + box[2];
                b = transform[5] + box[1];
                d = transform[5] + box[3];
            } else
            if(transform[0] == 1 && transform[4] == -1)
            {
                a = transform[2] + box[0];
                c = transform[2] + box[2];
                b = transform[5] - box[3];
                d = transform[5] - box[1];
            } else
            if(transform[0] == -1 && transform[4] == 1)
            {
                a = transform[2] - box[2];
                c = transform[2] - box[0];
                b = transform[5] + box[1];
                d = transform[5] + box[3];
            } else
            if(transform[0] == -1 && transform[4] == -1)
            {
                a = transform[2] - box[2];
                c = transform[2] - box[0];
                b = transform[5] - box[3];
                d = transform[5] - box[1];
            }
            if(transform[0] == 0 && transform[4] == 0)
            {
                for(int y = 0; y <= array[4] - array[3]; y++)
                {
                    for(int x = 0; x <= array[1] - array[0]; x++)
                    {
                        setMax(a + (double)(transform[1] * x * array[2]), b + (double)(transform[3] * y * array[5]), (a + (double)(transform[1] * x * array[2]) + c) - a - 1.0D, d + (double)(transform[3] * y * array[5]));
                        urlCount++;
                    }

                }

            } else
            {
                for(int y = 0; y <= array[4] - array[3]; y++)
                {
                    for(int x = 0; x <= array[1] - array[0]; x++)
                    {
                        setMax(a + (double)(transform[0] * x * array[2]), b + (double)(transform[4] * y * array[5]), (a + (double)(transform[0] * x * array[2]) + c) - a - 1.0D, d + (double)(transform[4] * y * array[5]));
                        urlCount++;
                    }

                }

            }
        }
    }

    void setMax(double a, double b, double c, double d)
    {
        if(maxX == 5000D)
        {
            if(a < c)
            {
                minX = a;
                maxX = c;
            } else
            {
                minX = c;
                maxX = a;
            }
            if(b < d)
            {
                minY = b;
                maxY = d;
            } else
            {
                minY = d;
                maxY = b;
            }
        }
        if(a < minX)
            minX = a;
        if(c < minX)
            minX = c;
        if(a > maxX)
            maxX = a;
        if(c > maxX)
            maxX = c;
        if(b < minY)
            minY = b;
        if(d < minY)
            minY = d;
        if(b > maxY)
            maxY = b;
        if(d > maxY)
            maxY = d;
    }

    void rePaint2()
    {
        int i;
        for(i = 0; data[i] != '\n'; i++);
        for(i++; data[i] != '\n'; i++);
        for(i++; data[i] != '\n'; i++);
        i++;
        boolean cont = true;
        while(data[i] == '<') 
        {
            Color mainColor = Color.white;
            byte mask = 0;
            byte color = 0;
            boolean stripes = false;
            if(data[i + 3] == 'e' && data[i + 4] == 'r')
            {
                System.out.println("Error Paint");
                for(i += 18; data[i] != '<'; i++);
            }
            int begin = i += 3;
            for(; data[i] != ' '; i++);
            String string = new String(data, begin, i - begin);
            if(string.compareTo("pwell") == 0)
            {
                mainColor = new Color(0.8078431F, 0.6470588F, 0.4509804F);
                mainColor = new Color(colormap[3]);
                mask = 7;
                color = 3;
                stripes = true;
            } else
            if(string.compareTo("nwell") == 0)
            {
                mainColor = new Color(0.0F, 0.0F, 0.0F);
                mainColor = new Color(colormap[7]);
                mask = 7;
                color = 7;
                stripes = true;
            } else
            if(string.compareTo("polysilicon") == 0)
            {
                mainColor = new Color(0.8235294F, 0.3215686F, 0.4823529F);
                mainColor = new Color(colormap[1]);
                mask = 7;
                color = 1;
            } else
            if(string.compareTo("ndiffusion") == 0)
            {
                mainColor = new Color(0.2588235F, 0.8352941F, 0.2588235F);
                mainColor = new Color(colormap[2]);
                mask = 7;
                color = 2;
            } else
            if(string.compareTo("pdiffusion") == 0)
            {
                mainColor = new Color(0.7921569F, 0.627451F, 0.4509804F);
                mainColor = new Color(colormap[3]);
                mask = 7;
                color = 3;
            } else
            if(string.compareTo("metal1") == 0)
            {
                mainColor = new Color(0.4823529F, 0.6470588F, 1.0F);
                mainColor = new Color(colormap[8]);
                mask = 8;
                color = 8;
            } else
            if(string.compareTo("metal2") == 0)
            {
                mainColor = new Color(0.7411765F, 0.6117647F, 0.8705882F);
                mainColor = new Color(colormap[16]);
                mask = 16;
                color = 16;
            } else
            if(string.compareTo("ntransistor") == 0)
            {
                mainColor = new Color(0.6627451F, 0.5137255F, 0.3960784F);
                mainColor = new Color(colormap[4]);
                mask = 7;
                color = 4;
            } else
            if(string.compareTo("ptransistor") == 0)
            {
                mainColor = new Color(0.7215686F, 0.2862745F, 0.3254902F);
                mainColor = new Color(colormap[5]);
                mask = 7;
                color = 5;
            } else
            if(string.compareTo("polycontact") == 0)
            {
                mainColor = new Color(0.6117647F, 0.1764706F, 0.7254902F);
                mask = 15;
                color = 9;
            } else
            if(string.compareTo("ndcontact") == 0)
            {
                mainColor = new Color(0.3490196F, 0.6352941F, 0.6470588F);
                mask = 15;
                color = 10;
            } else
            if(string.compareTo("pdcontact") == 0)
            {
                mainColor = new Color(0.5882353F, 0.6F, 0.6588235F);
                mask = 15;
                color = 11;
            } else
            if(string.compareTo("m2contact") == 0)
            {
                mainColor = new Color(0.6F, 0.509804F, 0.854902F);
                mask = 24;
                color = 24;
            } else
            if(string.compareTo("psubstratepcontact") == 0)
            {
                mainColor = new Color(0.5882353F, 0.6F, 0.6588235F);
                mask = 15;
                color = 11;
            } else
            if(string.compareTo("nsubstratencontact") == 0)
            {
                mainColor = new Color(0.3490196F, 0.6352941F, 0.6470588F);
                mask = 15;
                color = 10;
            } else
            if(string.compareTo("psubstratepdiff") == 0)
            {
                mainColor = new Color(0.7921569F, 0.627451F, 0.4509804F);
                mask = 7;
                color = 3;
            } else
            if(string.compareTo("nsubstratendiff") == 0)
            {
                mainColor = new Color(0.2588235F, 0.8352941F, 0.2588235F);
                mask = 7;
                color = 2;
            } else
            if(string.compareTo("pad") == 0)
            {
                mainColor = new Color(0.5254902F, 0.5254902F, 0.5254902F);
                mask = 24;
                color = 24;
            } else
            {
                if(string.compareTo("labels") == 0)
                    return;
                if(string.compareTo("end") == 0)
                    return;
                mainColor = Color.black;
            }
            i += 4;
            int cnt = 0;
            while(data[i] == 'r') 
            {
                i += 5;
                boolean sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double a = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    a *= 10D;
                    a += data[i] - 48;
                }

                if(sign)
                    a = -a;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double b = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    b *= 10D;
                    b += data[i] - 48;
                }

                if(sign)
                    b = -b;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double c = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    c *= 10D;
                    c += data[i] - 48;
                }

                if(sign)
                    c = -c;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double d = data[i] - 48;
                for(i++; data[i] != '\n'; i++)
                {
                    d *= 10D;
                    d += data[i] - 48;
                }

                if(sign)
                    d = -d;
                i++;
                if(!stripes)
                {
                    for(double y = mag * (maxY - d); y <= mag * (maxY - b); y++)
                    {
                        for(double x = mag * (a - minX) - 0.80000000000000004D; x < mag * (c - minX); x++)
                            pix[(int)x + (int)y * (int)(mag * (maxX - minX))] = (byte)(pix[(int)x + (int)y * (int)(mag * (maxX - minX))] & ~mask | color & mask);

                    }

                }
            }
            for(; data[i] == 'u'; i++);
        }
    }

    void rePaint3(Graphics buffer)
    {
        int i;
        for(i = 0; data[i] != '\n'; i++);
        for(i++; data[i] != '\n'; i++);
        for(i++; data[i] != '\n'; i++);
        i++;
        boolean cont = true;
        while(data[i] == '<') 
        {
            Color mainColor = Color.white;
            byte mask = 0;
            byte color = 0;
            boolean stripes = false;
            boolean cross = false;
            boolean dots = false;
            Polygon polygon = new Polygon();
            int begin = i += 3;
            for(; data[i] != ' '; i++);
            String string = new String(data, begin, i - begin);
            if(string.compareTo("pwell") == 0)
            {
                mainColor = new Color(0.8078431F, 0.6470588F, 0.4509804F);
                mainColor = new Color(colormap[3]);
                mask = 7;
                color = 3;
                stripes = true;
            } else
            if(string.compareTo("nwell") == 0)
            {
                mainColor = new Color(0.0F, 0.0F, 0.0F);
                mainColor = new Color(colormap[7]);
                mask = 7;
                color = 7;
                stripes = true;
            } else
            if(string.compareTo("polysilicon") == 0)
            {
                mainColor = new Color(0.8235294F, 0.3215686F, 0.4823529F);
                mainColor = new Color(colormap[1]);
                mask = 7;
                color = 1;
            } else
            if(string.compareTo("ndiffusion") == 0)
            {
                mainColor = new Color(0.2588235F, 0.8352941F, 0.2588235F);
                mainColor = new Color(colormap[2]);
                mask = 7;
                color = 2;
            } else
            if(string.compareTo("pdiffusion") == 0)
            {
                mainColor = new Color(0.7921569F, 0.627451F, 0.4509804F);
                mainColor = new Color(colormap[3]);
                mask = 7;
                color = 3;
            } else
            if(string.compareTo("metal1") == 0)
            {
                mainColor = new Color(0.4823529F, 0.6470588F, 1.0F);
                mainColor = new Color(colormap[8]);
                mask = 8;
                color = 8;
            } else
            if(string.compareTo("metal2") == 0)
            {
                mainColor = new Color(0.7411765F, 0.6117647F, 0.8705882F);
                mainColor = new Color(colormap[16]);
                mask = 16;
                color = 16;
            } else
            if(string.compareTo("ntransistor") == 0)
            {
                mainColor = new Color(0.6627451F, 0.5137255F, 0.3960784F);
                mainColor = new Color(colormap[4]);
                mask = 7;
                color = 4;
            } else
            if(string.compareTo("ptransistor") == 0)
            {
                mainColor = new Color(0.7215686F, 0.2862745F, 0.3254902F);
                mainColor = new Color(colormap[5]);
                mask = 7;
                color = 5;
            } else
            if(string.compareTo("polycontact") == 0)
            {
                mainColor = new Color(0.6117647F, 0.1764706F, 0.7254902F);
                mask = 15;
                color = 9;
                cross = true;
            } else
            if(string.compareTo("ndcontact") == 0)
            {
                mainColor = new Color(0.3490196F, 0.6352941F, 0.6470588F);
                mask = 15;
                color = 10;
                cross = true;
            } else
            if(string.compareTo("pdcontact") == 0)
            {
                mainColor = new Color(0.5882353F, 0.6F, 0.6588235F);
                mask = 15;
                color = 11;
                cross = true;
            } else
            if(string.compareTo("m2contact") == 0)
            {
                mainColor = new Color(0.6F, 0.509804F, 0.854902F);
                mask = 24;
                color = 24;
                dots = true;
            } else
            if(string.compareTo("psubstratepcontact") == 0)
            {
                mainColor = new Color(0.5882353F, 0.6F, 0.6588235F);
                cross = true;
            } else
            if(string.compareTo("nsubstratencontact") == 0)
            {
                mainColor = new Color(0.3490196F, 0.6352941F, 0.6470588F);
                cross = true;
            } else
            if(string.compareTo("psubstratepdiff") == 0)
                mainColor = new Color(0.7921569F, 0.627451F, 0.4117647F);
            else
            if(string.compareTo("nsubstratendiff") == 0)
                mainColor = new Color(0.2588235F, 0.8352941F, 0.2588235F);
            else
            if(string.compareTo("pad") == 0)
            {
                mainColor = new Color(0.5254902F, 0.5254902F, 0.5254902F);
                dots = true;
            } else
            {
                if(string.compareTo("labels") == 0 || string.compareTo("end") == 0)
                    break;
                mainColor = Color.black;
            }
            for(i += 4; data[i] == 'r';)
            {
                i += 5;
                boolean sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double a = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    a *= 10D;
                    a += data[i] - 48;
                }

                if(sign)
                    a = -a;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double b = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    b *= 10D;
                    b += data[i] - 48;
                }

                if(sign)
                    b = -b;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double c = data[i] - 48;
                for(i++; data[i] != ' '; i++)
                {
                    c *= 10D;
                    c += data[i] - 48;
                }

                if(sign)
                    c = -c;
                i++;
                sign = false;
                if(data[i] == '-')
                {
                    sign = true;
                    i++;
                }
                double d = data[i] - 48;
                for(i++; data[i] != '\n'; i++)
                {
                    d *= 10D;
                    d += data[i] - 48;
                }

                if(sign)
                    d = -d;
                i++;
                a = mag * (a - minX) + (double)offset;
                b = mag * (b - maxY) - (double)offset;
                c = mag * (c - minX) + (double)offset;
                d = mag * (d - maxY) - (double)offset;
                if(stripes)
                {
                    buffer.setColor(new Color(colormap[color]));
                    double x = a + 5D;
                    for(double y = -d + 5D; y < -b + (c - a); y += 10D)
                    {
                        if(x <= c && y <= -b)
                            buffer.drawLine((int)a, (int)y, (int)x, (int)(-d));
                        else
                        if(x > c && y > -b)
                            buffer.drawLine((int)(x - (d - b)), (int)(-b), (int)c, (int)(y - (c - a)));
                        else
                        if(x > c)
                            buffer.drawLine((int)a, (int)y, (int)c, (int)(y - (c - a)));
                        else
                        if(y > -b)
                            buffer.drawLine((int)(x - (d - b)), (int)(-b), (int)x, (int)(-d));
                        x += 10D;
                    }

                }
                if(dots)
                {
                    buffer.setColor(Color.black);
                    buffer.drawRect((int)a, (int)(-d), (int)(c - a), (int)(d - b));
                    int shift = 1;
                    for(int y = 2; (double)y < d - b - 1.0D; y += 4)
                    {
                        for(int x = 2 * (shift % 2); (double)x < c - a - 1.0D; x += 4)
                            buffer.drawRect((int)(a + (double)x), (int)(-d + (double)y), 1, 1);

                        shift++;
                    }

                }
                if(cross)
                {
                    buffer.setColor(Color.black);
                    buffer.drawRect((int)a, (int)(-d), (int)(c - a), (int)(d - b));
                    buffer.drawLine((int)a, (int)(-d), (int)(c - 1.0D), (int)(-b - 1.0D));
                    buffer.drawLine((int)(c - 1.0D), (int)(-d), (int)a, (int)(-b - 1.0D));
                }
            }

        }
        while(data[i] == 'u') 
        {
            int start = i + 4;
            for(i = start; data[i] != ' '; i++);
            String part = new String(data, start, i - start);
            for(; data[i] != '\n'; i++);
            int array[] = new int[6];
            if(data[i + 1] == 'a')
            {
                i = parseNumbers(6, i + 7, array);
            } else
            {
                array[0] = 0;
                array[1] = 0;
                array[2] = 0;
                array[3] = 0;
                array[4] = 0;
                array[5] = 0;
                i++;
            }
            for(; data[i] != '\n'; i++);
            int transform[] = new int[6];
            i = parseNumbers(6, i + 11, transform);
            int box[] = new int[4];
            i = parseNumbers(4, i + 4, box);
            double a = 0.0D;
            double b = 0.0D;
            double c = 0.0D;
            double d = 0.0D;
            if(transform[0] == 0 && transform[4] == 0)
            {
                if(transform[1] == 1 && transform[3] == 1)
                {
                    a = transform[2] + box[1];
                    c = transform[2] + box[3];
                    b = transform[5] + box[0];
                    d = transform[5] + box[2];
                } else
                if(transform[1] == 1 && transform[3] == -1)
                {
                    a = transform[2] + box[1];
                    c = transform[2] + box[3];
                    b = transform[5] - box[2];
                    d = transform[5] - box[0];
                } else
                if(transform[1] == -1 && transform[3] == 1)
                {
                    a = transform[2] - box[3];
                    c = transform[2] - box[1];
                    b = transform[5] + box[0];
                    d = transform[5] + box[2];
                } else
                if(transform[1] == -1 && transform[3] == -1)
                {
                    a = transform[2] - box[3];
                    c = transform[2] - box[1];
                    b = transform[5] - box[2];
                    d = transform[5] - box[0];
                }
            } else
            if(transform[0] == 1 && transform[4] == 1)
            {
                a = transform[2] + box[0];
                c = transform[2] + box[2];
                b = transform[5] + box[1];
                d = transform[5] + box[3];
            } else
            if(transform[0] == 1 && transform[4] == -1)
            {
                a = transform[2] + box[0];
                c = transform[2] + box[2];
                b = transform[5] - box[3];
                d = transform[5] - box[1];
            } else
            if(transform[0] == -1 && transform[4] == 1)
            {
                a = transform[2] - box[2];
                c = transform[2] - box[0];
                b = transform[5] + box[1];
                d = transform[5] + box[3];
            } else
            if(transform[0] == -1 && transform[4] == -1)
            {
                a = transform[2] - box[2];
                c = transform[2] - box[0];
                b = transform[5] - box[3];
                d = transform[5] - box[1];
            }
            a = mag * (a - minX) + (double)offset;
            b = mag * (b - maxY) - (double)offset;
            c = mag * (c - minX) + (double)offset;
            d = mag * (d - maxY) - (double)offset;
            buffer.setColor(Color.black);
            if(transform[0] == 0 && transform[4] == 0)
            {
                for(int y = 0; y <= array[4] - array[3]; y++)
                {
                    for(int x = 0; x <= array[1] - array[0]; x++)
                    {
                        buffer.drawRect((int)(a + mag * (double)transform[1] * (double)x * (double)array[2]), (int)(-d - mag * (double)transform[3] * (double)y * (double)array[5]), (int)(c - a - 1.0D), (int)(d - b - 1.0D));
                        if(array[0] == 0 && array[1] == 0 && array[3] == 0 && array[4] == 0)
                            buffer.drawString(part, (int)(a + mag * (double)transform[1] * (double)x * (double)array[2]), (int)((-d - mag * (double)transform[3] * (double)y * (double)array[5]) + (d - b - 1.0D) / 2D));
                        else
                            buffer.drawString(part + "[" + y + "," + x + "]", (int)(a + mag * (double)transform[1] * (double)x * (double)array[2]), (int)((-d - mag * (double)transform[3] * (double)y * (double)array[5]) + (d - b - 1.0D) / 2D));
                        urlCount++;
                        urls[urlCount] = base + part + ".html";
                        urlX1[urlCount] = (int)(a + mag * (double)transform[1] * (double)x * (double)array[2]);
                        urlX2[urlCount] = (int)((a + mag * (double)transform[1] * (double)x * (double)array[2] + c) - a - 1.0D);
                        urlY1[urlCount] = (int)(-d - mag * (double)transform[3] * (double)y * (double)array[5]);
                        urlY2[urlCount] = (int)(((-d - mag * (double)transform[3] * (double)y * (double)array[5]) + d) - b - 1.0D);
                    }

                }

            } else
            {
                for(int y = 0; y <= array[4] - array[3]; y++)
                {
                    for(int x = 0; x <= array[1] - array[0]; x++)
                    {
                        buffer.drawRect((int)(a + mag * (double)transform[0] * (double)x * (double)array[2]), (int)(-d - mag * (double)transform[4] * (double)y * (double)array[5]), (int)(c - a - 1.0D), (int)(d - b - 1.0D));
                        if(array[0] == 0 && array[1] == 0 && array[3] == 0 && array[4] == 0)
                            buffer.drawString(part, (int)(a + mag * (double)transform[0] * (double)x * (double)array[2]), (int)((-d - mag * (double)transform[4] * (double)y * (double)array[5]) + (d - b - 1.0D) / 2D));
                        else
                            buffer.drawString(part + "[" + y + "," + x + "]", (int)(a + mag * (double)transform[0] * (double)x * (double)array[2]), (int)((-d - mag * (double)transform[4] * (double)y * (double)array[5]) + (d - b - 1.0D) / 2D));
                        urlCount++;
                        urls[urlCount] = base + part + ".html";
                        urlX1[urlCount] = (int)(a + mag * (double)transform[0] * (double)x * (double)array[2]);
                        urlX2[urlCount] = (int)((a + mag * (double)transform[0] * (double)x * (double)array[2] + c) - a - 1.0D);
                        urlY1[urlCount] = (int)(-d - mag * (double)transform[4] * (double)y * (double)array[5]);
                        urlY2[urlCount] = (int)(((-d - mag * (double)transform[4] * (double)y * (double)array[5]) + d) - b - 1.0D);
                    }

                }

            }
            buffer.setColor(Color.black);
            buffer.fillRect(0, 0, 0, 0);
        }
    }

    int parseNumbers(int count, int i, int array[])
    {
        boolean sign = false;
        for(int pos = 0; pos < count - 1; pos++)
        {
            sign = false;
            if(data[i] == '-')
            {
                sign = true;
                i++;
            }
            array[pos] = data[i] - 48;
            for(i++; data[i] != ' '; i++)
            {
                array[pos] *= 10;
                array[pos] += data[i] - 48;
            }

            if(sign)
                array[pos] = -array[pos];
            i++;
        }

        sign = false;
        if(data[i] == '-')
        {
            sign = true;
            i++;
        }
        array[count - 1] = data[i] - 48;
        for(i++; data[i] != '\n'; i++)
        {
            array[count - 1] *= 10;
            array[count - 1] += data[i] - 48;
        }

        if(sign)
            array[count - 1] = -array[count - 1];
        return ++i;
    }

    boolean openFile(String fileName)
    {
        try
        {
            URL url = new URL(fileName);
            InputStream in = url.openStream();
            int size = 0;
            int val = 0;
            data = new char[0x249f0];
            while(val != -1) 
            {
                val = in.read();
                data[size] = (char)val;
                size++;
            }
        }
        catch(Exception e)
        {
            System.out.println("Read Error: Top " + e);
            return true;
        }
        return false;
    }

    public boolean mouseDown(Event event, int x, int y)
    {
        if(x < 300 && y >= bounds().height - offset)
        {
            try
            {
                System.out.println("M" + 'a' + 'g' + 'i' + 'c' + ' ' + 'V' + 'i' + 'e' + 'w' + 'e' + 'r' + ' ' + 'v' + '1' + '.' + '0' + ' ' + ' ' + ' ' + '\251' + '1' + '9' + '9' + '9' + ' ' + ' ' + ' ' + 'A' + 'a' + 'r' + 'o' + 'n' + ' ' + 'C' + '.' + ' ' + 'S' + 'h' + 'u' + 'm' + 'a' + 't' + 'e' + ' ' + ' ' + ' ' + 't' + 'r' + 'e' + 'k' + '@' + 's' + 't' + 'a' + 'n' + 'f' + 'o' + 'r' + 'd' + '.' + 'e' + 'd' + 'u');
                getAppletContext().showDocument(new URL("mailto:trek@stanford.edu"));
            }
            catch(MalformedURLException e)
            {
                System.out.println(e);
                return false;
            }
            return true;
        }
        if(urlCount < 0)
            return false;
        for(int i = 0; i <= urlCount; i++)
            if(x >= urlX1[i] && x <= urlX2[i] && y >= urlY1[i] && y <= urlY2[i])
            {
                try
                {
                    if(getParameter("Target") == null)
                        getAppletContext().showDocument(new URL(urls[i]));
                    else
                        getAppletContext().showDocument(new URL(urls[i]), getParameter("Target"));
                }
                catch(MalformedURLException e)
                {
                    System.out.println(e);
                    return false;
                }
                return true;
            }

        return false;
    }

    public magic()
    {
        maxX = 5000D;
        colorModel = new IndexColorModel(6, 64, redmap, greenmap, bluemap);
        offset = 30;
        mag = 1.0D;
        urlCount = 1;
    }

    int colormap[] = {
        0xffc8c8c8, 0xffdc5f5f, 0xff42d542, 0xffcaa073, 0xffa98365, 0xffb84953, 0xffe6e600, 0xff000000, 0xff7da6fa, 0xffa030bf, 
        0xff59a2a5, 0xff9699a8, 0xff8b759b, 0xff866695, 0xffbebe78, 0xff000000, 0xffbe99de, 0xffb65e9e, 0xff8fa1a9, 0xffae8ca5, 
        0xff947298, 0xff92769a, 0xffdccca9, 0xff000000, 0xff9982da, 0xff9028b2, 0xff718fa8, 0xff8d84ab, 0xff80798f, 0xff7f6f92, 
        0xffa89c81, 0xff000000, -1, 0xffb4b4c8, 0xff868686, 0xff000000, 0xffefbcc6, 0xffef7da2, 0xffd10000, 0xffa5d8af, 
        0xff7cbf94, 0xff00b500, 0xffaacaf2, 0xff6496fa, 0xff5a91fa, 0xffcb75d2, 0xffa700ac, -1869, -256, 0xffebc6a0, 
        0xffea8449, 0xffc69800, 0xff8b6c00, -34870, 0xff32e4e1, 0xff78511d, 0xffc8e6e6, 0xffb4d2b4, 0xff000000, 0xfff6f607, 
        0xff000000, -1, 0xff000000
    };
    byte redmap[] = {
        -56, -36, 66, -54, -87, -72, -26, 0, 125, -96, 
        89, -106, -117, -122, -66, 0, -66, -74, -113, -82, 
        -108, -110, -36, 0, -103, -112, 113, -115, -128, 127, 
        -88, 0, -1, -76, -122, 0, -17, -17, -47, -91, 
        124, 0, -86, 100, 90, -53, -89, -1, -1, -21, 
        -22, -58, -117, -1, 50, 120, -56, -76, 0, -10, 
        0, -1, 0, 1
    };
    byte greenmap[] = {
        -56, 95, -43, -96, -125, 73, -26, 0, -90, 48, 
        -94, -103, 117, 102, -66, 0, -103, 94, -95, -116, 
        114, 118, -52, 0, -126, 40, -113, -124, 121, 111, 
        -100, 0, -1, -76, -122, 0, -68, 125, 0, -40, 
        -65, -75, -54, -106, -111, 117, 0, -8, -1, -58, 
        -124, -104, 108, 119, -28, 81, -26, -46, 0, -10, 
        0, -1, 0, 1
    };
    byte bluemap[] = {
        -56, 95, 66, 115, 101, 83, 0, 0, -6, -65, 
        -91, -88, -101, -107, 120, 0, -34, -98, -87, -91, 
        -104, -102, -87, 0, -38, -78, -88, -85, -113, -110, 
        -127, 0, -1, -56, -122, 0, -58, -94, 0, -81, 
        -108, 0, -14, -6, -6, -46, -84, -77, 0, -96, 
        73, 0, 0, -54, -31, 29, -26, -76, 0, 7, 
        0, -1, 0, 1
    };
    char data[];
    double maxX;
    double minX;
    double maxY;
    double minY;
    Image image1;
    Image image2;
    Graphics buffer;
    IndexColorModel colorModel;
    int offset;
    int width;
    int height;
    double mag;
    byte pix[];
    String urls[];
    int urlX1[];
    int urlX2[];
    int urlY1[];
    int urlY2[];
    int urlCount;
    String base;
}
